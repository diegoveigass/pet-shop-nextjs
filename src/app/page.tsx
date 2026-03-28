import { endOfDay, parseISO, startOfDay } from "date-fns";
import { AppointmentForm } from "@/components/appointment-form";
import DatePicker from "@/components/date-picker";
import { PeriodSection } from "@/components/period-section";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { groupAppointmentsByPeriod } from "@/utils/appointment-utils";

type SearchParams = Promise<{
  date?: string;
}>;

type HomeProps = {
  searchParams: SearchParams;
};

export default async function Home({ searchParams }: HomeProps) {
  const { date } = await searchParams;

  const selectedDate = date ? parseISO(date) : new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduledAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });

  const periods = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex flex-col items-start justify-between gap-2 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-content-secondary text-paragraph-medium-size">
            Aqui você pode ver todos osclientes e serviços agendados para hoje
          </p>
        </div>
        <div>
          <DatePicker />
        </div>
      </div>
      <div className="pb-24 md:pb-0">
        {periods.map((period) => {
          return <PeriodSection key={period.title} period={period} />;
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#23242C] py-4.5 px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">Novo agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
