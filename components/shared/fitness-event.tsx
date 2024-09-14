import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Bookmark, Calendar, Clock, Share2, UserRound } from "lucide-react";
import Image from "next/image";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
}

export const FitnessEvent = ({ className, showAll }: IProps) => {
  return (
    <ul className={cn("grid grid-cols-auto-fit-three gap-[28px]", className)}>
      {Array.from({ length: showAll ? 3 : 3 }).map((_, i) => (
        <li
          key={i}
          className='bg-white pb-[18px] rounded-[5px] w-full text-[#1C1939]'
        >
          <article className='flex gap-[30px] flex-col'>
            <header>
              <div className='relative w-full h-[200px] sm:h-[187px]'>
                <Image
                  alt='Fitness Event Image'
                  fill
                  src='/images/fitness-event.png'
                />
              </div>
              <div className='px-[18px] flex flex-row justify-between items-center pt-[18px]'>
                <h3 className='font-bold text-lg'>Core Cardio</h3>
                <Button
                  style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                  variant='ghost'
                  size='icon'
                  className='bg-[#F4F2F2]  rounded-[10px] place-self-end'
                >
                  <Bookmark size={24} color='#1C1C1C' />
                </Button>
              </div>
            </header>
            <section className='px-[18px] space-y-[12px] text-[#737373]'>
              <div className='flex items-center gap-2  flex-row'>
                <Calendar size={18} />
                <p>32 March 2024</p>
              </div>
              <div className='flex items-center gap-2  flex-row'>
                <Clock size={18} />
                <p>Mon: 8am-10am</p>
              </div>
              <div className='flex items-center gap-2  flex-row'>
                <UserRound size={18} />
                <p>Ker-Fitness</p>
              </div>
            </section>

            <footer className='w-full px-[18px] justify-between gap-6 items-center flex flex-row'>
              <Button className='font-semibold text-sm text-off-white '>
                Get Ticket for ₦1500
              </Button>
              <Button
                style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                variant='ghost'
                size='icon'
                className='min-w-[45px] bg-[#F4F2F2] h-[45px] rounded-[10px] place-self-end'
              >
                <Share2 size={26} color='#1C1C1C' />
              </Button>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
};
