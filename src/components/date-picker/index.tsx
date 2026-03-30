"use client";

import { addDays, format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function DatePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const getInitialDate = useCallback(() => {
    if (!dateParam) {
      return undefined;
    }

    const [year, month, day] = dateParam.split("-").map(Number);

    const parsedDate = new Date(year, month - 1, day);

    if (isValid(parsedDate)) {
      setDate(parsedDate);
    }
  }, [dateParam]);

  useEffect(() => {
    getInitialDate();
  }, [getInitialDate]);

  const [date, setDate] = useState<Date | undefined>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function updateUrlWithDate(newDate: Date | undefined) {
    if (!newDate) return;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("date", format(newDate, "yyyy-MM-dd"));

    router.push(`${pathname}?${newParams.toString()}`);
  }

  function handleNavigateDay(days: number) {
    const newDate = addDays(date || new Date(), days);
    updateUrlWithDate(newDate);
  }

  function handleDateSelect(selectedDate: Date | undefined) {
    updateUrlWithDate(selectedDate);
    setDate(selectedDate);
    setIsPopoverOpen(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleNavigateDay(-1)}>
        <ChevronLeft className="size-4 " />
      </Button>

      <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-content-brand" />
              {date ? (
                format(date, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDown className="size-4 text-content-secondary opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            autoFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" onClick={() => handleNavigateDay(1)}>
        <ChevronRight className="size-4 " />
      </Button>
    </div>
  );
}
