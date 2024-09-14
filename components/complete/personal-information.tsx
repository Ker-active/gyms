"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

const fields = [
  {
    name: "personalInformation.fullname",
    label: "Full Name",
    placeholder: "Enter fullname",
  },
  {
    name: "personalInformation.email",
    label: "Email address",
    placeholder: "Enter email address",
  },
  {
    name: "personalInformation.phoneNumber",
    label: "Phone number",
    placeholder: "Enter phone number",
  },
  {
    name: "personalInformation.location",
    label: "Location",
    placeholder: "Enter location",
  },
  {
    name: "personalInformation.instagram",
    label: "Instagram",
    placeholder: "Full Instagram URL",
  },
  {
    name: "personalInformation.twitter",
    label: "X (twitter)",
    placeholder: "Full X URL",
  },
  {
    name: "personalInformation.website",
    label: "Website",
    placeholder: "https://url.com",
  },
] as const;

export const PersonalInformation = () => {
  const formSchema = useFormContext();
  return (
    <article className='flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4'>
      <header>
        <h3 className='text-[#1C1939] font-medium font-inter'>
          Personal Information
        </h3>
      </header>
      <hr />
      <div className='grid gap-x-4 gap-y-[18px] grid-cols-1 sm:grid-cols-2'>
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={formSchema.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    className=' h-[50px]'
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </article>
  );
};
