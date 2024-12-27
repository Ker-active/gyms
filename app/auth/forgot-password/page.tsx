"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, FormFieldType } from "@/lib/utils";
import { Routes } from "@/lib";
import { useTransition } from "react";
import { forgotPassword } from "@/actions/auth";
import { toast } from "sonner";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { useRouter } from "nextjs-toploader/app";
import { FormSchemaProvider } from "@/providers";
import { FormInput } from "@/components/forms";
import { AuthHeader } from "@/components/auth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";

const fields: FormFieldType<z.infer<typeof ForgotPasswordSchema>> = [
  {
    name: "email",
    label: "Email address",
    placeholder: "Enter email address",
    type: "email",
  },
];

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const router = useRouter();

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(() => {
      forgotPassword(values).then((response) => {
        if (response?.error) {
          toast.error(response?.error);
        }
        if (response.success) {
          toast.success(response.success);
          router.replace(Routes.resetPassword);
        }
      });
    });
  }

  return (
    <>
      <AuthHeader title='Forgot Password' />
      <Form {...form}>
        <FormSchemaProvider schema={ForgotPasswordSchema}>
          <form
            id='formId'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-[15px]'
          >
            {fields.map((field) => (
              <FormInput {...field} key={field.name} />
            ))}
          </form>
        </FormSchemaProvider>
      </Form>
      <Link className={cn("self-end underline text-sm")} href={Routes.login}>
        Have an account? Sign In
      </Link>
      <footer>
        <Button
          className='w-full'
          disabled={isPending}
          form='formId'
          type='submit'
        >
          Forgot Password
        </Button>
      </footer>
    </>
  );
}
