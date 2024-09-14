import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Clock, UserRound } from "lucide-react";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
}

export const FitnessClasses = ({ className, showAll }: IProps) => {
  return (
    <ul className={cn("flex flex-row flex-wrap gap-6", className)}>
      {Array.from({ length: showAll ? 36 : 6 }).map((_, i) => (
        <li
          key={i}
          className='bg-white w-full sm:w-[238px] text-[#1C1939] rounded-[16px] p-4'
        >
          <article className='flex gap-4 flex-col'>
            <h3 className='font-semibold text-lg'>Core Cardio</h3>
            <div>
              <div className='flex items-center gap-2  flex-row'>
                <Clock size={18} />
                <p>Mon: 8am-10am</p>
              </div>
              <div className='flex items-center gap-2  flex-row'>
                <UserRound size={18} />
                <p>Ker-Fitness</p>
              </div>
            </div>
            <Button
              className='rounded-[20px] text-sm font-normal border border-brand text-brand'
              size='sm'
              variant={"outline"}
            >
              View Profile
            </Button>
          </article>
        </li>
      ))}
    </ul>
  );
};
