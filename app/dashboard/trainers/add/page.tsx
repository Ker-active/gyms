"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Search } from "lucide-react";
import { Routes } from "@/lib";
import Link from "next/link";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { Form } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms";
import { useRouter } from "nextjs-toploader/app";
import { useGetTrainers } from "@/hooks/shared";
import { TUser } from "@/lib/types";
import { toast } from "sonner";
import { AvatarName } from "@/components/shared";

const Schema = z.object({
  email: z.string().optional(),
});

type TSchema = z.infer<typeof Schema>;

export default function Page() {
  const router = useRouter();
  const { data } = useGetTrainers();
  const [filteredTrainers, setFilteredTrainers] = useState([] as TUser[]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const form = useForm<TSchema>({
    resolver: zodResolver(Schema),
    mode: "onBlur",
  });

  function onSubmit(values: TSchema) {
    if (!values.email) return;

    const filtered = data?.data.filter((trainer) => trainer.email.toLowerCase().includes(values!?.email!.toLowerCase())) || [];
    if (filtered.length < 1) return toast.error("Trainer not found");

    setFilteredTrainers(filtered);
    setIsPopoverOpen(true);
  }

  return (
    <section className="flex min-h-full flex-col font-inter gap-10">
      <header className="flex flex-col gap-4 sm:flex-row items-start justify-between">
        <div className="flex flex-row items-center gap-2">
          <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF] " onClick={() => router.back()} size="icon">
            <ArrowLeft color="#737373" />
          </Button>
          <h2 className="section-header">Trainers and Coaches</h2>
        </div>
      </header>
      <section className="w-full bg-white flex-grow">
        <Overlay isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)} />
        <div className="flex flex-col px-4 pt-20 mx-auto max-w-[626px] w-full bg-white">
          <Form {...form}>
            <Popover
              containerClassName="z-50"
              isOpen={isPopoverOpen}
              padding={4}
              onClickOutside={() => setIsPopoverOpen(false)}
              align="start"
              positions={["bottom"]}
              content={
                <ul className="w-[calc(100vw-64px)] max-h-[350px] overflow-y-auto rounded-[20px] py-[20px] flex flex-col sm:w-[calc(626px-150px)] bg-white z-50">
                  {filteredTrainers.map((user, index) => (
                    <li className="flex flex-row justify-between py-[10px] items-center px-4 hover:bg-[#F9F9F9] hover:border-l-2 hover:border-primary transition-all duration-200 group" key={index}>
                      <AvatarName data={user} />
                      <Button className="italic text-sm text-primary sm:opacity-0  opacity-100 sm:group-hover:opacity-100 transition-opacity duration-200" variant="link">
                        Add
                      </Button>
                    </li>
                  ))}
                </ul>
              }
            >
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 flex-col sm:flex-row items-end">
                <FormInput placeholder="Enter email" label="Search By Email" labelClassName="font-medium" className="rounded-full" containerClassName="w-full" name="email" />
                <Button type="submit" className="h-[45px] w-full sm:w-auto gap-2" size="sm">
                  <Search size={18} />
                  <span>Search</span>
                </Button>
              </form>
            </Popover>
          </Form>
          <Link className="text-[12px] text-[#3385FF] ml-1 mt-2 underline" href={Routes["create-trainer"]}>
            Add Trainer Manually
          </Link>
        </div>
      </section>
    </section>
  );
}

const Overlay = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />;
};
