"use client";

import { Empty, LoadingComponent, SectionHeader } from "@/components/shared";
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
import { useGetPrices } from "@/hooks/price";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api";
import { CacheKeys, showError } from "@/lib";
import { toast } from "sonner";

const schema = z.object({
  _id: z.string().optional(),
  packageName: z.string().min(1, { message: "This is required" }),
  price: z.string().min(1, { message: "This is required" }),
  description: z.string().min(1, { message: "This is required" }).max(200, { message: "Must be 200 characters or less" }),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPending, data } = useGetPrices();

  const { mutate, isPending: creatingPrice } = useMutation({
    mutationFn: (arg: Schema) => {
      if (arg._id) {
        const { _id, ...rest } = arg;
        return client.put(`/price/edit/${arg._id}`, rest);
      }
      return client.post("/price/create", arg);
    },
    onError: (error) => showError(error),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.Price],
      });
      resetFields();
      setIsModalOpen(false);

      toast.success("Saved successfully");
    },
  });

  function resetFields() {
    form.reset({
      packageName: "",
      price: "",
      description: "",
      _id: "",
    });
  }

  const { mutate: deletePrice, isPending: deletingPrice } = useMutation({
    mutationFn: (arg: string) => client.delete(`/price/delete/${arg}`),
    onError: (error) => showError(error),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.Price],
      });
      toast.success("Deleted");
    },
  });

  function onSubmit(values: Schema) {
    mutate(values);
  }

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
              <FormInput<Schema> label="Package Name" name="packageName" placeholder="Example: CrossFit" />
              <FormInput<Schema> isTextArea name="description" label="Description (Max:200 words)" />
              <FormInput<Schema> type="number" label="Price" name="price" placeholder="Example: CrossFit" />
              <Button disabled={creatingPrice} size="sm">
                Done
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <section className="flex min-h-full flex-col w-full font-inter gap-10">
        <SectionHeader onClick={openModal} rightElementText="Add New" title="Price Packages" />

        {isPending || !data ? (
          <LoadingComponent />
        ) : (
          <>
            {data?.data.length == 0 ? (
              <Empty onClick={openModal} desc="You do not have any Price Packages yet. Prices would appear here. " alt="Price Icon" linkText="Add Price" src="/price-tag.png" />
            ) : (
              <section
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                }}
                className="grid gap-6 "
              >
                {data?.data.map((plan) => (
                  <article className="border p-[30px] rounded-[7px] bg-white border-[#E2E2E2]" key={plan._id}>
                    <header className="flex flex-row items-center gap-2">
                      <Image alt="Plan Icon" src="/plan.svg" width={40} height={40} />
                      <p className="text-xl text-[#1D1C20] font-bold">{plan.packageName}</p>
                    </header>
                    <p className="text-[#707991] mt-[12px] text-sm">{plan.description}</p>
                    <p className="font-bold mt-[30px] text-[#1D1C20] text-xl">{Number(plan.price).toLocaleString()} NGN</p>
                    <div className="mt-[40px] flex flex-row items-center gap-4">
                      <Button
                        onClick={() => {
                          form.reset({ ...plan });
                          openModal();
                        }}
                        className="px-[100px] h-[45px]"
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={deletingPrice}
                        onClick={() => {
                          deletePrice(plan._id);
                        }}
                        style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                        variant="ghost"
                        size="icon"
                        className="min-w-[45px] bg-[#F4F2F2] h-[45px] rounded-[10px]"
                      >
                        <Delete size={26} color="#1C1C1C" />
                      </Button>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
}
