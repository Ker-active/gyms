"use client";

import { AuthHeader } from "../../../components/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { FormFieldType } from "@/lib/utils";
import { Routes } from "@/lib";
import { useTransition } from "react";
import { login } from "@/actions/auth";
import { toast } from "sonner";
import { LoginSchema, TLogin } from "@/schemas/auth";
import { useRouter } from "nextjs-toploader/app";

const fields: FormFieldType<TLogin> = [
  { name: "email", label: "Email address", placeholder: "Enter email address", type: "email" },
  { name: "password", label: "Password", placeholder: "****", type: "text" },
];

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  function onSubmit(values: TLogin) {
    startTransition(() => {
      login(values).then((response) => {
        if (response?.error) {
          toast.error(response?.error);
        }
        if (response.success) {
          router.replace(Routes.home);
        }
      });
    });
  }

  return (
    <>
      <AuthHeader desc="Don't have an account?" title="Welcome Back" href={Routes.register} />
      <Form {...form}>
        <form id="formId" onSubmit={form.handleSubmit(onSubmit)} className="space-y-[15px]">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input {...field} {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
      <footer>
        <Button className="w-full" disabled={isPending} form="formId" type="submit">
          Login
        </Button>
      </footer>
    </>
  );
}
