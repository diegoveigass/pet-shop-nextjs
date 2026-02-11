import { AppointmentForm } from "@/components/appointment-form";
import { PeriodSection } from "@/components/period-section";
import type { Appointment as AppointmentPrisma } from "@/generated/prisma/client";

import type { Appointment, AppointmentPeriod } from "@/types/appointment";
import { getPeriod } from "@/utils/appointment-utils";
import { APPOINTMENTS } from "@/utils/mock-data";

export default async function Home() {
  // const appointments = await prisma.appointment.findMany();

  function groupAppointmentsByPeriod(
    appointments: AppointmentPrisma[],
  ): AppointmentPeriod[] {
    const transformedAppointment: Appointment[] = appointments.map(
      (appointment) => {
        return {
          ...appointment,
          time: appointment.scheduledAt.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          period: getPeriod(appointment.scheduledAt.getHours()),
        };
      },
    );

    const morningAppointments = transformedAppointment.filter(
      (appointment) => appointment.period === "morning",
    );

    const afternoonAppointments = transformedAppointment.filter(
      (appointment) => appointment.period === "afternoon",
    );

    const eveningAppointments = transformedAppointment.filter(
      (appointment) => appointment.period === "evening",
    );

    return [
      {
        title: "Manhã",
        type: "morning",
        timeRange: "09h-12h",
        appointments: morningAppointments,
      },
      {
        title: "Tarde",
        type: "afternoon",
        timeRange: "13h-18h",
        appointments: afternoonAppointments,
      },
      {
        title: "Noite",
        type: "evening",
        timeRange: "19h-21h",
        appointments: eveningAppointments,
      },
    ];
  }

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

      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-background-tertiary py-4.5 px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm />
      </div>
    </div>
  );
}
