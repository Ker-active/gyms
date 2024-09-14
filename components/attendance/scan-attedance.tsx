"use client";

import { Button, ButtonProps } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { cn } from "@/lib";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IProps extends ButtonProps {}

export const ScanBarCode = ({ className, ...rest }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            size='sm'
            className={cn("w-fit px-4", className)}
            {...rest}
          >
            Scan Barcode
          </Button>
        </DialogTrigger>
        <DialogContent className='w-[90%] sm:[390px] rounded-[5px] sm:w-full'>
          <DialogHeader>
            <DialogTitle> Scan Barcode</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className='space-y-4'
          >
            <Button type='submit' className='w-full  font-normal'>
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
