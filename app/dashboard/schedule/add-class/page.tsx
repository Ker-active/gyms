/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FormCheckBox, FormDate, FormInput, FormMedia, FormSelect } from "@/components/forms";
import { FormReactSelect } from "@/components/forms/form-react-select";
import { SectionHeader } from "@/components/shared/section-header";
import { Form } from "@/components/ui/form";
import { useGetClassDetails, useGetTrainers, useGetUser } from "@/hooks/shared";
import { CacheKeys, cn, showError } from "@/lib";
import { client } from "@/lib/api";
import { FormSchemaProvider } from "@/providers";
import { AddClassSchema, TClassSchema } from "@/schemas/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { data } = useGetTrainers();
  const { data: userData } = useGetUser();
  const form = useForm<TClassSchema>({
    resolver: zodResolver(AddClassSchema),
    mode: "onBlur",
    defaultValues: {
      free: false,
      media: [],
    },
  });
  const classId = searchParams.get("classId");
  const { data: classDetails } = useGetClassDetails(classId);

  const trainersOptions = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((trainer) => ({
      value: trainer._id,
      label: trainer.fullname,
    }));
  }, [data?.data]);

  function onSubmit(values: TClassSchema) {
    if (form.getValues("media").length == 0) return toast.error("Picture is required");
    mutate(values);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TClassSchema) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key == "media" && value.every((item: any) => typeof item === "string")) return;
        if (key == "media") {
          value.forEach((item: any) => {
            formData.append("media", item);
          });
          return;
        }
        if (key == "price" && form.getValues("free") == true) return;

        formData.append(key, value as any);
      });

      return classId ? client.put(`/class/edit/${classId}`, formData) : client.post(`/class/create`, formData);
    },
    onError: (error) => {
      showError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.CLASSES],
      });
      toast.success("Saved successfully");
      router.back();
    },
  });

  useEffect(() => {
    if (classDetails) {
      form.reset({
        ...classDetails.data,
        availableSlot: classDetails.data.availableSlot.toString(),
        price: classDetails.data?.price.toString(),
        room: classDetails.data?.room.toString(),
        trainer: classDetails.data.trainer._id,
      });
    }
  }, [classDetails]);

  return (
    <section className="flex flex-col  font-inter gap-10">
      <SectionHeader
        disabled={isPending}
        className="mt-2  sm:mt-0"
        containerClass="flex-row sm:flex-row items-center"
        type="submit"
        form="form"
        title={classId ? "Edit Class" : "Add New Class"}
        rightElementText={classId ? "Update Class" : "Add Class"}
      />
      <Form {...form}>
        <FormSchemaProvider schema={AddClassSchema._def.schema}>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col  bg-white  px-[27px] py-[40px] rounded-[8px] gap-6  ">
            <div className="grid grid-cols-1 place-items-start  gap-[28px] sm:grid-cols-2">
              <FormInput<TClassSchema> containerClassName="w-full" placeholder="Example: CrossFit" label="Title" name="title" />
              <FormSelect<TClassSchema> containerClassName="w-full" placeholder="Select" options={userData?.data.services || []} label="Type" name="type" />

              <FormReactSelect<TClassSchema>
                containerClassName="w-full"
                handleOnChange={(e) => {
                  form.setValue("trainer", e?.value);
                }}
                placeholder="Select"
                options={trainersOptions}
                label="Trainer"
                name="trainer"
              />

              <FormInput<TClassSchema> containerClassName="w-full" placeholder="Enter" label="Available Slot" name="availableSlot" />
              <FormInput<TClassSchema> containerClassName="w-full" placeholder="Enter" label="Location" name="location" />
              <FormInput<TClassSchema> containerClassName="w-full" placeholder="Enter" label="Room" name="room" />
              <FormDate<TClassSchema> containerClassName="w-full" name="date" />

              <div className={cn("flex flex-row gap-4 items-start")}>
                <FormInput<TClassSchema> name="timeFrom" label="Time From" type="time" />
                <p className={cn("mt-auto", form.formState.errors?.timeFrom || form.formState.errors.timeTo ? "mb-9" : "mb-3")}>to</p>
                <FormInput<TClassSchema> name="timeTo" type="time" label="Time To" />
              </div>

              <div className="flex flex-row gap-6 items-center w-full justify-between">
                <FormInput<TClassSchema> disabled={form.watch("free")} type="number" containerClassName="w-full" placeholder="Enter" label="Price" name="price" />
                <FormCheckBox<TClassSchema>
                  containerClassName={cn("mt-auto mb-3", form?.formState?.errors?.price && "mb-9")}
                  checkBoxProps={{ className: "w-[25px] h-[25px]" }}
                  name="free"
                  checkBoxLabel="Free?"
                />
              </div>
              <FormInput<TClassSchema> placeholder="Enter" containerClassName="w-full" label="Online Link" name="onlineLink" />
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
            <FormMedia label="Upload Picture of Class" />
          </form>
        </FormSchemaProvider>
      </Form>
    </section>
  );
}
