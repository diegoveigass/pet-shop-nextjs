"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dog, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import z from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const appointmentFormSchema = z.object({
  tutorName: z.string().min(1, "O nome do tutor é obrigatório"),
  petName: z.string().min(1, "O nome do pet é obrigatório"),
  phone: z.string().min(11, "O telefone é obrigatório"),
  description: z.string().min(3, "A descrião é obrigatória"),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      tutorName: "",
      petName: "",
      description: "",
      phone: "",
    },
    resolver: zodResolver(appointmentFormSchema),
  });

  const getTodayDay = () => {
    const today = new Date().toDateString();

    return today;
  };

  function handleSubmit(data: AppointmentFormValues) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo agendamento</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>
          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="tutorName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Nome do tutor
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand size-5" />
                        <Input
                          placeholder="Nome do tutor"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="petName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Nome do pet
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Dog className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand size-5" />
                        <Input
                          placeholder="Nome do pet"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Nome do pet
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand size-5" />
                        <IMaskInput
                          placeholder="(99) 99999-9999"
                          mask="(00) 00000-0000"
                          className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {getTodayDay()}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-label-medium-size text-content-primary">
                      Descrição do serviço
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição do serviço"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
