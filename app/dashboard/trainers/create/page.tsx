"use client";

import { Media, PersonalInformation, ProfessionalSummary, Services } from "@/components/profile";
import { Certification } from "@/components/trainers";
import { Photo } from "@/components/trainers/photo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  personalInformation: z.object({
    fullname: z.string().min(1, { message: "Fullname is required." }),
    email: z.string().email(),
    phoneNumber: z.string().min(1, { message: "Phone number is required." }),
    photo: z.any(),
    certification: z.any(),
    location: z.string().optional(),
    professionalSummary: z.string().min(1, { message: "Summary is required." }),
  }),
  services: z.array(z.string().min(1, { message: "Service is required." })),
  media: z.array(z.any()),
});

export type TProfile = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const form = useForm<TProfile>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      services: [],
      media: [],
    },
  });

  function onSubmit() {
    if (form.getValues("media").length === 0) return toast.error("Media is required");
    if (!form.getValues("personalInformation.certification")) return toast.error("Please add a certification");
  }

  return (
    <section className="flex min-h-full flex-col font-inter gap-10">
      <header className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF] " onClick={() => router.back()} size="icon">
            <ArrowLeft color="#737373" />
          </Button>
          <h2 className="section-header">Trainers and Coaches</h2>
        </div>
        <Button type="submit" form="form" size="sm">
          Add Trainer
        </Button>
      </header>

      <Form {...form}>
        <form className="flex flex-col gap-[30px]" id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-stretch gap-[30px] sm:gap-[51px] sm:flex-row">
            <div className="flex-col w-full flex gap-[30px]">
              <PersonalInformation
                fields={[
                  {
                    name: "personalInformation.email",
                    label: "Email",
                    placeholder: "Email",
                    type: "email",
                  },
                ]}
              />
              <ProfessionalSummary />
            </div>
            <div className="sm:max-w-[262px] gap-[30px] flex flex-col sm:min-h-full  w-full">
              <Photo />
              <Certification />
            </div>
          </div>
          <Services />
          <Media />
        </form>
      </Form>
    </section>
  );
}
