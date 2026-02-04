import { AppointmentForm } from "@/components/appointment-form";
import { PeriodSection } from "@/components/period-section";
import { groupAppointmentsByPeriod } from "@/utils/appointment-utils";
import { APPOINTMENTS } from "@/utils/mock-data";

export default async function Home() {
  // const appointments = await prisma.appointment.findMany();

  const periods = groupAppointmentsByPeriod(APPOINTMENTS);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-content-secondary text-paragraph-medium-size">
            Aqui você pode ver todos osclientes e serviços agendados para hoje
          </p>
        </div>
      </div>
      <div className="pb-24 md:pb-0">
        {periods.map((period) => {
          return <PeriodSection key={period.title} period={period} />;
        })}
      </div>

      <div>
        <AppointmentForm />
      </div>
    </div>
  );
}
