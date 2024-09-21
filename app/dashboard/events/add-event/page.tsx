"use client";
import { FormCheckBox, FormDate, FormInput, FormSelect } from "@/components/forms";
import { SectionHeader } from "@/components/shared/section-header";
import { Form, FormLabel } from "@/components/ui/form";
import { AddEventSchema, TEventSchema } from "@/schemas/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("eventId") ? true : false;
  const form = useForm<TEventSchema>({
    resolver: zodResolver(AddEventSchema),
    mode: "onBlur",
    defaultValues: {
      free: false,
    },
  });

  function onSubmit(values: TEventSchema) {
    if (!form.getValues("picture")) return toast.error("Picture is required");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    form.setValue("picture", files[0]);
  }
  return (
    <section className="flex flex-col font-inter gap-10">
      <SectionHeader type="submit" form="form" title={isEdit ? "Edit Event" : "Add New Event"} rightElementText="Save Event" />
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
                <FormSelect<TEventSchema> options={["00:00", "01:00", "02:00"]} name="timeFrom" />
                <p>to</p>
                <FormSelect<TEventSchema> options={["00:00", "01:00", "02:00"]} name="timeTo" />
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center w-full justify-between">
              <FormInput<TEventSchema> containerClassName="w-full" placeholder="Enter" label="Price" name="price" />
              <FormCheckBox<TEventSchema> containerClassName="mt-auto mb-3" checkBoxProps={{ className: "w-[25px] h-[25px]" }} name="free" checkBoxLabel="Free?" />
            </div>
            <FormInput<TEventSchema> placeholder="Enter" label="Online Link" name="onLineLink" />
          </div>
          <div>
            <FormLabel>Upload Picture of Class</FormLabel>
            <div className="relative border border-dashed min-h-[300px]  w-full rounded-[5px] overflow-hidden">
              {form.watch("picture") ? (
                <Image className="object-contain" fill src={URL.createObjectURL(form.watch("picture"))} alt="Media Icon" />
              ) : (
                <div className="flex flex-col items-center justify-center   text-[13px] h-[300px]  ">
                  <Image alt="Media Icon" src={"/gallery.svg"} width={80} height={80} />
                  <p>You do not have any picture yet. </p>
                  <input accept="image/*" onChange={handleChange} id="media" type="file" hidden />
                  <button type="button" onClick={() => document.getElementById("media")?.click()} className="text-primary underline">
                    Upload media
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
