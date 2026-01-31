import type { AppointmentPeriod } from "@/types/appointment";
import { Sun, Moon, Cloudy } from "lucide-react";

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloudy className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

type PeriodSectionProps = {
  period: AppointmentPeriod;
};

export function PeriodSection({ period }: PeriodSectionProps) {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between border-b border-[#2e2c30]">
        <div className="flex items-center gap-2">
          {periodIcons[period?.type]}
          <h2 className="text-label-large-size text-content-primary">
            {period?.title}
          </h2>
        </div>
        <span className="text-label-large-size text-content-secondary">
          {period.timeRange}
        </span>
      </div>
    </section>
  );
}
