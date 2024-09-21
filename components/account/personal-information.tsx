"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { FormFieldType } from "@/lib";
import { Button } from "../ui/button";

const schema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  email: z.string().email(),
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
  location: z.string().optional(),
});

type TSchema = z.infer<typeof schema>;

const fields: FormFieldType<TSchema> = [
  { name: "fullname", label: "Full Name", placeholder: "Enter fullname" },
  { name: "email", label: "Email address", placeholder: "Enter email address" },
  {
    name: "phoneNumber",
    label: "Phone number",
    placeholder: "Enter phone number",
  },
  { name: "location", label: "Location", placeholder: "Enter location" },
] as const;

export const PersonalInformation = () => {
  const formSchema = useForm<TSchema>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {},
  });
  return (
    <article className="flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4">
      <header>
        <h3 className="text-[#1C1939] text-[22px] font-semibold font-inter">Personal Information</h3>
      </header>
      <hr />
      <Form {...formSchema}>
        <form className="grid gap-x-4 gap-y-[18px] grid-cols-1 sm:grid-cols-2">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={formSchema.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input className="border-0 outline-0 h-[50px] bg-off-white" placeholder={field.placeholder} {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button className="rounded-sm">Save</Button>
        </form>
      </Form>
    </article>
  );
};
