/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FormCheckBox, FormDate, FormInput, FormMedia, FormSelect } from "@/components/forms";
import { SectionHeader } from "@/components/shared/section-header";
import { Form, FormLabel } from "@/components/ui/form";
import { useGetEventDetails } from "@/hooks/shared";
import { CacheKeys, cn, showError } from "@/lib";
import { client } from "@/lib/api";
import { time } from "@/lib/time";
import { AddEventSchema, TEventSchema } from "@/schemas/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const { data: eventDetails } = useGetEventDetails(eventId);
  const queryClient = useQueryClient();
  const form = useForm<TEventSchema>({
    resolver: zodResolver(AddEventSchema),
    mode: "onBlur",
    defaultValues: {
      free: false,
      media: [],
    },
  });

  useEffect(() => {
    if (eventDetails) {
      form.reset(eventDetails.data);
    }
  }, [eventDetails]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TEventSchema) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        //prevent sending only strings to the server
        if (key == "media" && value.every((item: File | string) => typeof item === "string")) return;
        if (key == "media") {
          value.forEach((item: File) => {
            formData.append("media", item);
          });
          return;
        }
        formData.append(key, value as any);
      });
      return eventId ? client.put(`/event/edit/${eventId}`, formData) : client.post(`/event/create`, formData);
    },
    onError: (error) => {
      showError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.Events],
      });
      toast.success("Saved successfully");
      router.back();
    },
  });

  function onSubmit(values: TEventSchema) {
    if (form.getValues("media").length == 0) return toast.error("Picture is required");
    mutate(values);
  }

  return (
    <section className="flex flex-col font-inter gap-10">
      <SectionHeader containerClass="flex-row sm:flex-row items-center" disabled={isPending} type="submit" form="form" title={eventId ? "Edit Event" : "Add New Event"} rightElementText="Save Event" />
      <Form {...form}>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col  bg-white  px-[27px] py-[40px] rounded-[8px] gap-6  ">
          <div className="grid grid-cols-1 gap-[28px] sm:grid-cols-2">
            <FormInput<TEventSchema> placeholder="Example: CrossFit" label="Title" name="title" />
            <FormInput<TEventSchema> placeholder="Enter" label="Available Slot" name="availableSlot" />
            <FormInput<TEventSchema> placeholder="Enter" label="Location" name="location" />
            <FormInput<TEventSchema> placeholder="Enter" label="Room" name="room" />
            <FormDate<TEventSchema> name="date" />
            <div className="space-y-2">
              <FormLabel>Time</FormLabel>
              <div className="flex flex-row gap-4 items-center">
                <FormSelect<TEventSchema> options={time} name="timeFrom" />
                <p>to</p>
                <FormSelect<TEventSchema> options={time} name="timeTo" />
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center w-full justify-between">
              <FormInput<TEventSchema> type="number" containerClassName="w-full" placeholder="Enter" label="Price" name="price" />
              <FormCheckBox<TEventSchema>
                containerClassName={cn("mt-auto mb-3", form?.formState?.errors?.price && "mb-9")}
                checkBoxProps={{ className: "w-[25px] h-[25px]" }}
                name="free"
                checkBoxLabel="Free?"
              />
            </div>
            <FormInput<TEventSchema> placeholder="Enter" label="Online Link" name="onlineLink" />
          </div>
          <FormMedia label="Upload a banner" />
        </form>
      </Form>
    </section>
  );
}
