import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export const Subscription = () => {
  return (
    <article className='space-y-4 px-[20px] py-[15px] bg-white'>
      <header className='space-x-1'>
        <div className='flex flex-row items-center justify-between'>
          <p className='text-[#1C1939] text-sm'>Fitness Subscription</p>
          <Link href='#'>View All</Link>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <h3 className='text-[#1C1939] text-[22px] font-semibold font-inter'>
            ₦200,000
          </h3>
          <p className='text-sm flex flex-row items-center gap-1 text-[#737373]'>
            <TrendingUp color='#3CC76B' size={16} />
            <span className='text-[#3CC76B]'>+23.1%</span>{" "}
            <span>vs last month</span>
          </p>
        </div>
      </header>
      <hr />
      <div className='flex gap-1 overflow-x-auto flex-col'>
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            className='bg-[#F8F7FA] w-[500px] py-[20px] flex flex-row items-center justify-between gap-4 px-[8px]  text-sm [60px] rounded-[8px]'
            key={i}
          >
            <p className='text-[#686868]'>02-01-2022</p>
            <p className='underline text-[#377DFF]'>Ker-Fitness</p>
            <p className='text-[#686868] text-bold font-bold font-inter'>
              ₦200,000
            </p>
            <p>Active</p>
            <Button className='w-fit font-normal  h-[30px] bg-[#008080] rounded-[4px]'>
              Renew
            </Button>
          </div>
        ))}
      </div>
    </article>
  );
};
