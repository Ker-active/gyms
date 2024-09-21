"use client";

import { Empty, SectionHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms";

const plans = [
  {
    label: "Day Pass",
    desc: "Enjoy the freedom to explore our Fitness studio and classes without full financial commitment",
    price: 20000,
  },
  {
    label: "Monthly",
    desc: "Achieve your fitness goals with unlimited access to the gym and all our classes.",
    price: 50000,
  },
  {
    label: "Yearly",
    desc: "Achieve your fitness goals with unlimited access to the gym and all our classes.",
    price: 20000,
  },
];

const schema = z.object({
  name: z.string().min(1, { message: "This is required" }),
  price: z.string().min(1, { message: "This is required" }),
  desc: z.string().min(1, { message: "This is required" }).max(200, { message: "Must be 200 characters or less" }),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onSubmit() {}

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Price Package</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-[20px]" onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput<Schema> label="Package Name" name="name" placeholder="Example: CrossFit" />
              <FormInput<Schema> isTextArea name="desc" label="Description (Max:200 words)" />
              <FormInput<Schema> label="Price" name="price" placeholder="Example: CrossFit" />
              <Button size="sm">Done</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <section className="flex min-h-full flex-col w-full font-inter gap-10">
        <SectionHeader onClick={openModal} rightElementText="Add New" title="Price Packages" />
        <Empty onClick={openModal} desc="You do not have any Price Packages yet. Prices would appear here. " alt="Price Icon" linkText="Add Price" src="/price-tag.png" />
        <section
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          }}
          className="grid gap-6 "
        >
          {plans.map((plan) => (
            <article className="border p-[30px] rounded-[7px] bg-white border-[#E2E2E2]" key={plan.label}>
              <header className="flex flex-row items-center gap-2">
                <Image alt="Plan Icon" src="/plan.svg" width={40} height={40} />
                <p className="text-xl text-[#1D1C20] font-bold">{plan.label}</p>
              </header>
              <p className="text-[#707991] mt-[12px] text-sm">{plan.desc}</p>
              <p className="font-bold mt-[30px] text-[#1D1C20] text-xl">{plan.price.toLocaleString()} NGN</p>
              <div className="mt-[40px] flex flex-row items-center gap-4">
                <Button className="px-[100px] h-[45px]" variant="outline" size="sm">
                  Edit
                </Button>
                <Button style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }} variant="ghost" size="icon" className="min-w-[45px] bg-[#F4F2F2] h-[45px] rounded-[10px]">
                  <Delete size={26} color="#1C1C1C" />
                </Button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </>
  );
}
