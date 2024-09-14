import { Routes } from "@/lib";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLUListElement> {}

const Gym = ({ className }: IProps) => {
  return (
    <li
      style={{
        background: `linear-gradient(180deg, rgba(49, 49, 49, 0) 0%, #313131 100%), url('/images/gyms.png')`,
      }}
      className={cn(
        "w-full sm:max-w-[320px] px-5 py-3 flex items-end  overflow-hidden rounded-[30px] h-[200px] relative",
        className
      )}
      key={1}
    >
      <Link
        href={`${Routes.gyms}/${Math.random()}`}
        className='flex w-full flex-row justify-between items-center'
      >
        <div className='text-off-white'>
          <p className={cn("font-inter text-base font-bold")}>Fitness Plus</p>
          <p className='text-[12px]'>15 mins away</p>
        </div>
        <div
          style={{
            boxShadow: "0px 4.83px 29px 0px #00000033",
            background:
              "linear-gradient(142.59deg, rgba(217, 217, 217, 0.18) -18.46%, rgba(217, 217, 217, 0.23) 56.86%, rgba(217, 217, 217, 0) 122.24%)",
          }}
          className={cn(
            "w-[60px] flex flex-row gap-1 font-inter items-center justify-center text-sm text-off-white h-[26px] rounded-[20px]"
          )}
        >
          <Star fill='#FFE142' size={14} color='#FFE142' />
          <p className={cn("font-inter", "text-[10px]")}>4.5</p>
        </div>
      </Link>
    </li>
  );
};

interface IProps {
  showAll?: boolean;
}

export const Gyms = ({ showAll = false }: IProps) => {
  return (
    <ul className={cn("grid grid-cols-auto-fit-three gap-6")}>
      {Array.from({ length: showAll ? 36 : 6 }).map((_, i) => (
        <Gym showAll={showAll} className={cn(showAll && "h-[181px]")} key={i} />
      ))}
    </ul>
  );
};
