import type { Appointment as AppointmentPrisma } from "@/generated/prisma/client";
import type {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from "@/types/appointment";

function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour <= 12) {
    return "morning";
  } else if (hour >= 13 && hour <= 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export function groupAppointmentsByPeriod(
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
