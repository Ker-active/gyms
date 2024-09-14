"use client";

import { FormCheckBox, FormDate, FormInput, FormSelect } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { AddClassSchema, TClassSchema } from "@/schemas/add-class";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const form = useForm<TClassSchema>({
    resolver: zodResolver(AddClassSchema),
    mode: "onBlur",
    defaultValues: {
      free: false,
    },
  });

  function onSubmit(values: TClassSchema) {
    if (!form.getValues("picture")) return toast.error("Picture is required");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    form.setValue("picture", files[0]);
  }

  return (
    <section className="flex flex-col font-inter gap-10">
      <header className="flex flex-col lg:flex-row  items-start gap-4 lg:items-center justify-between">
        <div className="flex flex-row w-full gap-[18px] items-center">
          <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF] " onClick={() => router.back()} size="icon">
            <ArrowLeft color="#737373" />
          </Button>
          <h2 className="section-header">Add New Class</h2>
        </div>
        <Button type="submit" form="form" size="sm" className="mt-2  sm:mt-4">
          Add Class
        </Button>
      </header>
      <Form {...form}>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col  bg-white  px-[27px] py-[40px] rounded-[8px] gap-6  ">
          <div className="grid grid-cols-1 gap-[28px] sm:grid-cols-2">
            <FormInput<TClassSchema> placeholder="Example: CrossFit" label="Title" name="title" />
            <FormSelect<TClassSchema> placeholder="Select" options={["CrossFit", "Yoga", "Zumba"]} label="Type" name="title" />
            <FormSelect<TClassSchema> placeholder="Select" options={["John doe", "Wura"]} label="Trainer" name="trainer" />
            <FormInput<TClassSchema> placeholder="Enter" label="Available Slot" name="availableSlot" />
            <FormInput<TClassSchema> placeholder="Enter" label="Location" name="location" />
            <FormInput<TClassSchema> placeholder="Enter" label="Room" name="room" />
            <FormDate<TClassSchema> name="date" />
            <div className="space-y-2">
              <FormLabel>Time</FormLabel>
              <div className="flex flex-row gap-4 items-center">
                <FormSelect<TClassSchema> options={["00:00", "01:00", "02:00"]} name="timeFrom" />
                <p>to</p>
                <FormSelect<TClassSchema> options={["00:00", "01:00", "02:00"]} name="timeTo" />
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center w-full justify-between">
              <FormInput<TClassSchema> containerClassName="w-full" placeholder="Enter" label="Price" name="price" />
              <FormCheckBox<TClassSchema> containerClassName="mt-auto mb-3" checkBoxProps={{ className: "w-[25px] h-[25px]" }} name="free" checkBoxLabel="Free?" />
            </div>
            <FormInput<TClassSchema> placeholder="Enter" label="Online Link" name="onLineLink" />
          </div>
          <FormInput<TClassSchema>
            className="h-[200px] resize-none"
            maxLength={200}
            placeholder="Write something..."
            label="Description"
            isTextArea
            name="description"
            formDescription="Not more than 200 words"
          />
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
