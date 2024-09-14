"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { cn } from "@/lib";

interface IProps extends ButtonProps {
  /**
   * This component will work for both gym and trainers
   *
   */
  isGym?: boolean;
}

export const AddReview = ({ className, isGym = true, ...rest }: IProps) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    review: "",
    rating: 0,
  });

  function handleChange(selectedValue: number) {
    setState((prevState) => ({
      ...prevState,
      rating: selectedValue,
    }));
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            style={{
              boxShadow: "0px 12px 40px 0px #1018403D",
            }}
            variant='outline'
            className={cn(
              "w-auto self-end border-brand font-normal text-brand",
              className
            )}
            {...rest}
          >
            Add Review
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='w-[90%] rounded-[5px] sm:w-full'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className='space-y-4'
          >
            <div>
              <Label>Rate {isGym ? "Gym" : "Trainer"}</Label>
              <Rating
                style={{ maxWidth: 122 }}
                value={state.rating}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label>Add Review</Label>
              <Textarea
                required
                value={state.review}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    review: e.target.value,
                  }))
                }
                placeholder='Write something...'
                className='h-[213px] resize-none'
              />
            </div>
            <div className='flex flex-row justify-end gap-4'>
              <Button
                onClick={() => setOpen(false)}
                type='button'
                variant={"outline"}
                className='w-[132px] font-normal'
              >
                Cancel
              </Button>
              <Button type='submit' className='w-[132px]  font-normal'>
                Send
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
