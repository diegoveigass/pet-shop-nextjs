export type AppointmentPeriodDay = "morning" | "afternoon" | "evening";

export type Appointment = {
  id: string;
  time: string;
  petName: string;
  description: string;
  tutorName: string;
  phone: string;
  scheduledAt: Date;
  period: AppointmentPeriodDay;
};

export type AppointmentPeriod = {
  title: string;
  type: AppointmentPeriodDay;
  timeRange: string;
  appointments: Appointment[];
};
