/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { CacheKeys, FormFieldType } from "@/lib";
import { Button } from "../ui/button";
import { useGetUser } from "@/hooks/shared";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  email: z.string().email(),
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
  location: z.string().optional(),
});

type TSchema = z.infer<typeof schema>;

const fields: FormFieldType<TSchema> = [
  { name: "fullname", label: "Full Name", disabled: true, placeholder: "Enter fullname", type: "text" },
  { name: "email", label: "Email address", disabled: true, placeholder: "Enter email address", type: "email" },
  {
    name: "phoneNumber",
    label: "Phone number",
    placeholder: "Enter phone number",
    type: "number",
    disabled: true,
  },
  { name: "location", label: "Location", placeholder: "Enter location", type: "text" },
] as const;

export const PersonalInformation = () => {
  const { data } = useGetUser();
  const queryClient = useQueryClient();
  const formSchema = useForm<TSchema>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      formSchema.reset(data.data);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (args: TSchema) => {
      const formData = new FormData();
      Object.entries(args).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return client.put(`/user/update/${data?.data._id}`, formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.USER],
      });
      toast.success("Profile updated successfully");
    },
  });

  function onSubmit(value: TSchema) {
    mutate(value);
  }

  return (
    <article className="flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4">
      <header>
        <h3 className="text-[#1C1939] text-lg font-semibold  font-inter">Personal Information</h3>
      </header>
      <hr />
      <Form {...formSchema}>
        <form onSubmit={formSchema.handleSubmit(onSubmit)} className="grid gap-x-4 gap-y-[18px] grid-cols-1 sm:grid-cols-2">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={formSchema.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input className="border-0 outline-0 h-[50px] bg-off-white" {...field} {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" disabled={isPending} className="rounded-sm px-6 w-fit">
            Save
          </Button>
        </form>
      </Form>
    </article>
  );
};
