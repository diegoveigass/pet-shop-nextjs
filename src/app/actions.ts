"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { calculatePeriod } from "@/utils/appointment-utils";

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

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

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

    revalidatePath("/");

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

export async function updateAppointment(
  id: string,
  data: Partial<AppointmentData>,
) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduledAt } = parsedData;
    const hour = scheduledAt.getHours();

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          "Appointments must be only between 9am - 12am, 13pm - 18pm and 19pm - 21pm",
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduledAt,
        id: {
          not: id,
        },
      },
    });

    if (existingAppointment) {
      return {
        error: "This hour of appointment is already reserved",
      };
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    });

    revalidatePath("/");
    return {
      success: "Appointment updated sucessfully",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to update appointment",
    };
  }
}

export async function deleteAppointment(id: string) {
  try {
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id,
      },
    });

    if (!existingAppointment) {
      return {
        error: "Appointment not found.",
      };
    }

    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return {
      success: "Appointment deleted sucessfully",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to delete appointment",
    };
  }
}
