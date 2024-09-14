"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleX, ListFilter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { FilteredInput } from "@/components/forms";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  title: string;
  inputPlaceholder?: string;
}

const filterSchema = z.object({
  location: z.string().optional(),
  activities: z.string().optional(),
  rating: z.string().optional(),
  wheelChair: z.string().optional(),
});

type Type = z.infer<typeof filterSchema>;

export const FilterHeader = ({
  title,
  inputPlaceholder = "Search by  gym, location and activities",
}: IProps) => {
  const router = useRouter();
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const form = useForm<Type>({
    resolver: zodResolver(filterSchema),
  });

  function onSubmit(values: Type) {
    console.log(values);
  }

  return (
    <header className='flex flex-col lg:flex-row  items-start gap-4 lg:items-center justify-between'>
      <div className='flex flex-row w-full gap-[18px] items-center'>
        <Button
          variant='ghost'
          className='border-[1.2px] rounded-[8px] border-[#BFBFBF] '
          onClick={() => router.back()}
          size='icon'
        >
          <ArrowLeft color='#737373' />
        </Button>
        <h2 className='section-header'>{title}</h2>
      </div>
      <div className='flex flex-col w-full justify-end sm:flex-row gap-[18px] sm:items-center '>
        <div className='bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 w-full sm:w-[320px]  flex flex-row px-2 items-center gap-2 rounded-[30px]'>
          <Search size={20} color='#999999' />
          <Input
            className='border-none py-0 placeholder:text-[#25273366] focus-visible:ring-offset-0  px-0 rounded-full outline-0  focus-visible:ring-0  min-h-full text-[#737373] text-sm'
            placeholder={inputPlaceholder}
          />
        </div>
        <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
          <PopoverTrigger asChild>
            <Button
              className='rounded-full w-full sm:w-[93px] flex flex-row gap-[6px] text-sm  h-[40px]'
              size='sm'
            >
              <ListFilter size={18} />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className='relative w-[350px] sm:w-[391px] space-y-2 sm:space-y-[28px] text-[#1C1939] sm:right-10'>
            <header className='flex flex-row w-full items-center justify-between'>
              <h3 className='font-bold text-xl'>Filters</h3>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsPopOverOpen(false)}
              >
                <CircleX />
              </Button>
            </header>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col overflow-auto pb-4  gap-1 sm:gap-4'
              >
                <FilteredInput<Type> name='location' label='Location' />
                <FilteredInput<Type> name='activities' label='Activities' />
                <FilteredInput<Type> name='rating' label='Rating' />
                <FilteredInput<Type>
                  name='wheelChair'
                  label='wheelChair Accessible'
                />
                <Button className='mt-2 sm:mt-4'>Apply Filter</Button>
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
