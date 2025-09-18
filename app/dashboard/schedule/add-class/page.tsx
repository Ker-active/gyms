/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FormCheckBox, FormDate, FormInput, FormMedia, FormSelect } from "@/components/forms";
import { RecurringModal, RecurringData } from "@/components/shared";
import { FormReactSelect } from "@/components/forms/form-react-select";
import { SectionHeader } from "@/components/shared/section-header";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useGetClassDetails, useGetTrainers, useGetUser, useGetGymTrainer } from "@/hooks/shared";
import { CacheKeys, cn, showError } from "@/lib";
import { client } from "@/lib/api";
import { IClass } from "@/lib/types";
import { FormSchemaProvider } from "@/providers";
import { AddClassSchema, TClassSchema } from "@/schemas/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false);
  const [recurringData, setRecurringData] = useState<RecurringData | null>(null);
  // Try both trainer fetching methods for testing
  const { data: trainerData } = useGetTrainers();
  const { data: userData } = useGetUser();
  // const gymId = userData?.data?._id ?? null;
  const { data: gymTrainerData } = useGetGymTrainer(userData?.data?._id ?? null);
  
  // Monitor data loading
  useEffect(() => {
    if (!userData?.data && !trainerData?.data && !gymTrainerData?.data) {
      console.log("Waiting for trainer data to load...");
    }
  }, [userData, trainerData, gymTrainerData]);

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
    // Try to get trainers from either source
    const trainers = gymTrainerData?.data || trainerData?.data || [];
    
    const options = trainers.map((trainer) => ({
      value: trainer._id,
      label: trainer.fullname,
    }));
    
    return options;
  }, [gymTrainerData?.data, trainerData?.data]);

  function onSubmit(values: TClassSchema) {
    // Validate availableSlot is a number
    if (isNaN(Number(values.availableSlot))) {
      return toast.error("Available slot must be a number");
    }
    
    // Convert availableSlot to a number to ensure it's sent correctly
    form.setValue("availableSlot", Number(values.availableSlot).toString());
    
    if (form.getValues("media").length == 0) return toast.error("Picture is required");
    mutate({ ...values, recurringData });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TClassSchema & { recurringData: RecurringData | null }) => {
      const formData = new FormData();
      const { recurringData, ...classData } = data;
      
      // Add regular class data
      Object.entries(classData).forEach(([key, value]) => {
        if (value === undefined) return;
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
      
      // Handle recurring data
      if (recurringData) {
        formData.append("isRecurring", "true");
        formData.append("recurrencePattern", recurringData.recurrencePattern);
        formData.append("interval", recurringData.interval.toString());
        formData.append("rangeStart", recurringData.rangeStart);
        formData.append("rangeEnd", recurringData.rangeEnd);
        
        // Add weekDays if present
        if (recurringData.weekDays && recurringData.weekDays.length > 0) {
          recurringData.weekDays.forEach((day, index) => {
            formData.append(`weekDays[${index}]`, day);
          });
        }
        
        // Add monthly specific fields if present
        if (recurringData.recurrencePattern === "MONTHLY") {
          if (recurringData.monthlyWeekOrdinal) {
            formData.append("monthlyRule[week]", recurringData.monthlyWeekOrdinal);
          }
          if (recurringData.monthlyWeekday) {
            formData.append("monthlyRule[day]", recurringData.monthlyWeekday.toLowerCase());
          }
        }
      } else {
        // Explicitly set isRecurring to false for non-recurring classes
        formData.append("isRecurring", "false");
      }
      // Form data ready for submission
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
      // Use type assertion to access recurring properties
      const classData = classDetails.data as IClass & {
        isRecurring: boolean;
        recurrencePattern: "DAILY" | "WEEKLY" | "MONTHLY";
        interval: number;
        weekDays: string[];
        rangeStart: string;
        rangeEnd: string;
        monthlyRule?: {
          week: string;
          day: string;
        };
      };
      
      // Format date properly for the form
      let formattedDate = classData.date;
      if (classData.date === null && classData.isRecurring) {
        // For recurring classes with null date, use rangeStart as a fallback
        const startDate = new Date(classData.rangeStart);
        formattedDate = startDate.toISOString().split('T')[0];
      } else if (classData.date) {
        // Ensure date is in the correct format YYYY-MM-DD
        formattedDate = new Date(classData.date).toISOString().split('T')[0];
      }
      
      form.reset({
        ...classData,
        date: formattedDate || '',
        availableSlot: classData.availableSlot.toString(),
        price: classData?.price?.toString() || "",
        room: classData?.room?.toString() || "",
        trainer: classData.trainer._id,
      });
      
      // Check if class is recurring and set the recurring data
      if (classData.isRecurring) {
        const initialRecurringData: RecurringData = {
          isRecurring: true,
          recurrencePattern: classData.recurrencePattern,
          interval: classData.interval,
          rangeStart: new Date(classData.rangeStart).toISOString().split('T')[0],
          rangeEnd: new Date(classData.rangeEnd).toISOString().split('T')[0],
        };
        
        // Add weekDays if present
        if (classData.weekDays && classData.weekDays.length > 0) {
          initialRecurringData.weekDays = classData.weekDays;
        }
        
        // Add monthly specific fields if present
        if (classData.recurrencePattern === "MONTHLY" && classData.monthlyRule) {
          initialRecurringData.monthlyWeekOrdinal = classData.monthlyRule.week;
          initialRecurringData.monthlyWeekday = classData.monthlyRule.day;
        }
        
        setRecurringData(initialRecurringData);
      }
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

              <div className={cn("flex flex-row gap-2 items-end flex-wrap sm:flex-nowrap")}> 
                <FormInput<TClassSchema> name="timeFrom" label="Time" type="time" className="w-[100px] sm:w-[120px] px-3" />
                <p className={cn("mt-auto", form.formState.errors?.timeFrom || form.formState.errors.timeTo ? "mb-9" : "mb-3")}>to</p>
                <FormInput<TClassSchema>
                  name="timeTo"
                  type="time"
                  className="w-[100px] sm:w-[120px] px-3"
                  label="Time"
                  labelClassName="invisible"
                />
                  
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  disabled={
                    // In edit mode, only disable if there are validation errors
                    classId ? (
                      !!form.formState.errors.title ||
                      !!form.formState.errors.type ||
                      !!form.formState.errors.availableSlot ||
                      !!form.formState.errors.date ||
                      !!form.formState.errors.timeFrom ||
                      !!form.formState.errors.timeTo ||
                      !!form.formState.errors.description
                    ) : (
                      // In create mode, check all required fields
                      !form.watch("title") || 
                      !form.watch("type") || 
                      !form.watch("availableSlot") || 
                      !form.watch("date") || 
                      !form.watch("timeFrom") || 
                      !form.watch("timeTo") || 
                      !form.watch("description") ||
                      !!form.formState.errors.title ||
                      !!form.formState.errors.type ||
                      !!form.formState.errors.availableSlot ||
                      !!form.formState.errors.date ||
                      !!form.formState.errors.timeFrom ||
                      !!form.formState.errors.timeTo ||
                      !!form.formState.errors.description
                    )
                  }
                  className="self-end h-[40px] leading-none text-white font-normal whitespace-nowrap px-4 text-sm bg-[#008080] hover:bg-[#006666] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={async () => {
                    
                    // Validate specific fields excluding trainer for recurring setup
                    const isValid = await form.trigger(['title', 'type', 'availableSlot', 'date', 'timeFrom', 'timeTo', 'description']);
                    
                    if (!isValid) {
                      toast.error("Please fix any errors before setting up recurring options");
                      return;
                    }
                    
                    if (!classId && form.getValues("media").length === 0) {
                      toast.error("Please upload at least one picture before setting up recurring options");
                      return;
                    }
                    
                    // All validations passed - open recurring modal
                    setIsRecurringModalOpen(true);
                  }}
                  >
                   {classId ? "Edit Recurring" : "Make Recurring"}
                  </Button>
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
      <RecurringModal 
        isOpen={isRecurringModalOpen} 
        setIsOpen={setIsRecurringModalOpen}
        formTimeFrom={form.watch("timeFrom")}
        formTimeTo={form.watch("timeTo")}
        initialData={classId ? recurringData : null}
        onSubmitRecurring={(data) => {
          setRecurringData(data);
          toast.success(classId ? "Recurring pattern updated" : "Recurring pattern added");
        }}
      />
    </section>
  );
}
