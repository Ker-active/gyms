"use client";

import { z } from "zod";
import { AuthHeader } from "../../../components/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { FormFieldType } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RegisterSchema, TRegister } from "@/schemas/auth";
import { useTransition } from "react";
import { register } from "@/actions/auth";
import { toast } from "sonner";
import { Routes } from "@/lib";

const fields: FormFieldType<TRegister> = [
  {
    name: "fullname",
    label: "Full Name",
    placeholder: "Enter full name",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter phone number",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "Enter email address",
  },
  { name: "password", label: "Password", placeholder: "****" },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "****" },
] as const;

export default function Signup() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      userType: "GYMS",
    },
  });
  const router = useRouter();

  function onSubmit(values: TRegister) {
    startTransition(() => {
      register(values).then((response) => {
        if (response?.error) {
          toast.error(response?.error);
        }
        if (response.success) {
          toast.success(response.success);
          router.replace(Routes.home);
        }
      });
    });
  }

  return (
    <>
      <AuthHeader
        desc='Already have an account?'
        title='Get started with ker Active'
        href={Routes.login}
      />
      <Form {...form}>
        <form
          id='formId'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-[15px]'
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={field.placeholder} {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
      <footer>
        <Button disabled={isPending} form='formId' type='submit'>
          Create account
          {/* Next */}
        </Button>
      </footer>
    </>
  );
}
