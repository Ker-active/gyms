"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Pencil, Share2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CopyLink } from "@/components/shared";
import { Routes } from "@/lib";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  return (
    <section className="flex flex-col font-inter gap-10">
      <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF] " onClick={() => router.back()} size="icon">
        <ArrowLeft color="#737373" />
      </Button>
      <section className="bg-white py-[35px]">
        <header className="space-y-2 px-[34px] ">
          <div className="flex flex-row items-center justify-between">
            <p className="text-[#1C1939] font-bold tracking-[0.5px] text-2xl">Core Cardio by Kerfitness</p>
            <div className="flex gap-4 flex-row items-center">
              <AddMember />
              <Popover>
                <PopoverTrigger asChild>
                  <Button style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }} variant="ghost" size="icon" className="bg-[#F4F3F6] min-w-[45px]  rounded-[10px] place-self-end">
                    <Share2 size={24} color="#008080" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <CopyLink />
                </PopoverContent>
              </Popover>
              <Link
                style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                href={`${Routes["add-class"]}?classId=hello`}
                className={buttonVariants({ variant: "ghost", size: "icon", className: "bg-[#F4F3F6] min-w-[45px]  rounded-[10px] place-self-end" })}
              >
                <Pencil size={24} color="#008080" />
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-[#008080]  font-semibold font-inter">Thursday, September 5th, 6:30pm - 7:30pm</h3>
            <p className="text-sm flex flex-row items-center gap-1 text-[#737373]">20 slots available</p>
          </div>
        </header>
        <hr className="mt-2" />
        <article className="space-y-2 pt-[35px] text-[#1C1939] px-[34px] ">
          <h3 className="font-semibold">Description</h3>
          <p className="text-[#737373] leading-[30px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, doloribus amet? Sint perspiciatis cum sit adipisci porro quasi rerum, repudiandae modi doloremque facere aliquam possimus odit
            aliquid voluptatibus optio, et dolore ex quibusdam illum itaque totam nemo a maxime dolor? Dicta fugit odit eligendi reprehenderit eius quae neque sequi quas.
          </p>
        </article>
        <article className="space-y-2 py-[35px] text-[#1C1939] px-[34px] ">
          <h3 className="font-semibold">Booked</h3>
          <div className="flex gap-[20px]  overflow-x-auto flex-col">
            {Array.from({ length: 2 }).map((_, i) => (
              <div className="bg-[#F8F7FA] text-[#767676] py-[20px] flex flex-row items-center justify-between gap-4 px-6  text-sm  rounded-[8px]" key={i}>
                <p>Ifeanyi Chisom</p>
                <p>Sept 16,2024</p>
                <div className="flex flex-row items-center gap-1">
                  <Checkbox className="border-[#737373] rounded-full" id="attendance" />
                  <label htmlFor="attendance" className="text-[#767676] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Attended
                  </label>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

type Schema = z.infer<typeof schema>;

const AddMember = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [isOpen, setIsOpen] = useState(false);

  function onSubmit() {}

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }} variant="ghost" size="icon" className="bg-[#F4F3F6] min-w-[45px]  rounded-[10px] place-self-end">
          <User size={24} color="#008080" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-[20px]" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput<Schema> label="First Name" name="firstName" placeholder="Example: CrossFit" />
            <FormInput<Schema> label="Last Name" name="lastName" placeholder="Example: CrossFit" />
            <Button size="sm">Add Member</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
