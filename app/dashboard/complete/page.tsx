"use client";

import { Amenities, Media, PersonalInformation, ProfessionalSummary, Services } from "@/components/complete";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetUser } from "@/hooks/shared";
import { CacheKeys, cn, showError } from "@/lib";
import { client } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  personalInformation: z.object({
    fullname: z.string().min(1, { message: "Fullname is required." }),
    phoneNumber: z.string().min(1, { message: "Phone number is required." }),
    location: z.string().optional(),
    instagram: z.string().min(1, { message: "Instagram is required." }),
    twitter: z.string().optional(),
    website: z.string().optional(),
    professionalSummary: z.string().min(1, { message: "Summary is required." }),
  }),
  services: z.array(z.string().min(1, { message: "Service is required." })),
  amenities: z.array(z.string().min(1, { message: "This is required." })),
  media: z.array(z.any()),
});

export type TProfile = z.infer<typeof schema>;

const calculatePercentage = (data: TProfile) => {
  let percentage = 0;

  const { personalInformation, services, amenities, media } = data;

  // Check personalInformation completeness (25%)
  const personalInfoComplete = personalInformation?.fullname && personalInformation?.phoneNumber && personalInformation?.instagram && personalInformation?.professionalSummary;

  if (personalInfoComplete) percentage += 25;

  // Check services, amenities, media
  if (services.length >= 2) percentage += 25;
  if (amenities.length >= 2) percentage += 25;
  if (media.length >= 2) percentage += 25;

  return percentage;
};

export default function Page() {
  const { data: userData } = useGetUser();
  const queryClient = useQueryClient();
  const form = useForm<TProfile>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      amenities: [],
      services: [],
      media: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TProfile) => {
      const formData = new FormData();
      Object.entries(data.personalInformation).forEach(([key, value]) => {
        formData.append(key, value);
      });

      data.services.forEach((service) => {
        formData.append("services", service);
      });

      data.amenities.forEach((amenity) => {
        formData.append("amenities", amenity);
      });

      data.media.forEach((media) => {
        formData.append("media", media);
      });

      return client.put(`/user/update/${userData?.data._id}`, formData);
    },
    onError: (error) => {
      showError(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.USER],
      });
      toast.success("Profile updated successfully");
    },
  });

  const percentage = calculatePercentage(form.watch());

  function onSubmit(value: TProfile) {
    if (form.getValues("media").length === 0) return toast.error("Media is required");
    mutate(value);
  }

  return (
    <section className="flex flex-col gap-[30px]">
      <header className={cn("flex flex-row bg-[#FFFAF1] border py-[9px] px-4 rounded-[8px]  border-[#FFB020] items-center justify-between", percentage == 100 && "border-primary")}>
        <div className="flex flex-row gap-2 items-center">
          <Info color={percentage == 100 ? "#008080" : "#996A13"} size={16} />
          <p className={cn("text-[#996A13] font-sm font-semibold", percentage == 100 && "text-primary")}>Complete your profile to continue</p>
        </div>
        <Button disabled={isPending} type="submit" form="form" size="sm" className={cn("bg-[#D59C34] w-fit", percentage == 100 && "bg-primary")}>
          {percentage}%
        </Button>
      </header>
      <Form {...form}>
        <form className="flex flex-col gap-[30px]" id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <PersonalInformation
            fields={[
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
            ]}
          />
          <ProfessionalSummary />
          <Services />
          <Amenities />
          <Media />
        </form>
      </Form>
    </section>
  );
}
