import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddReview } from "../shared";

interface IProps {
  /**
   * Hides the add review button if true
   */
  hideAddButton?: boolean;
}

export const ReviewComponent = ({ hideAddButton = false }: IProps) => {
  return (
    <section className=' flex flex-col space-y-8'>
      <section className='grid grid-cols-auto-fit-three gap-[30px]'>
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            className='bg-white  text-[#1C1C1C] flex flex-col gap-4 rounded-[10px] p-[20px]'
            key={index}
          >
            <header className='flex gap-2 items-center flex-row'>
              <Avatar className='w-10 h-10'>
                <AvatarImage src='https://avatars.githubusercontent.com/u/42998943?v=4' />
                <AvatarFallback>Ay</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <p className='font-bold text-base'>Ayomide Samuel</p>
                <div className='flex flex-row gap-[2px]'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      fill='#D7B500'
                      color='#D7B500'
                      size={16}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </header>
            <p className='text-[#3A3A3A] text-sm'>
              There’s no other program that walks you through exactly what you
              need to know to start an online store fast, written by someone who
              has built several 7-figure ecommerce businesses from scratch.
            </p>
            <p className='self-end text-sm text-[#3C3C4380]'>22.03.2021</p>
          </article>
        ))}
      </section>
      {!hideAddButton && <AddReview />}
    </section>
  );
};
