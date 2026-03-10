"use server";

import z from "zod";
import { prisma } from "@/lib/prisma";

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduledAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduledAt } = parsedData;
    const hour = scheduledAt.getHours();

    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          "Appointments must be only between 9am - 12am, 13pm - 18pm and 19pm - 21pm",
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduledAt,
      },
    });

    if (existingAppointment) {
      return {
        error: "This hour of appointment is already reserved",
      };
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    });

    return {
      success: "Appointment created sucessfully",
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Failed to create appointment",
    };
  }
}
