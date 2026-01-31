import { PeriodSection } from "@/components/period-section";
import type { Appointment as AppointmentPrisma } from "@/generated/prisma/client";
import type {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from "@/types/appointment";

const appointments = [
  {
    id: "1",
    petName: "Rex",
    description: "Consulta",
    tutorName: "João",
    phone: "(15) 99744-6285",
    scheduledAt: new Date("2026-01-31T10:00:00"),
  },
  {
    id: "2",
    petName: "Thor",
    description: "Banho e Tosa",
    tutorName: "Diego",
    phone: "(15) 99744-6285",
    scheduledAt: new Date("2026-01-31T11:00:00"),
  },
  {
    id: "3",
    petName: "Mel",
    description: "Tosa",
    tutorName: "Luísa",
    phone: "(15) 99744-6285",
    scheduledAt: new Date("2026-01-31T16:00:00"),
  },
  {
    id: "4",
    petName: "Linguiça",
    description: "Banho",
    tutorName: "Amanda",
    phone: "(15) 99744-6285",
    scheduledAt: new Date("2026-01-31T19:00:00"),
  },
];

function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour <= 12) {
    return "morning";
  } else if (hour >= 13 && hour <= 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

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

export default function Home() {
  const periods = groupAppointmentsByPeriod(appointments);

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
    </div>
  );
}
