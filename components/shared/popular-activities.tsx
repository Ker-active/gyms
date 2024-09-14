import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
}

const activities = [
  {
    image: "/images/boxing.png",
    label: "Boxing",
  },
  {
    image: "/images/basketball.png",
    label: "Basket Ball",
  },
  {
    image: "/images/yoga.png",
    label: "Yoga",
  },
  {
    image: "/images/cycling.png",
    label: "Cycling",
  },
  {
    image: "/images/tennis.png",
    label: "Tennis",
  },
  {
    image: "/images/swimming.png",
    label: "Swimming",
  },
] as const;

export const PopularActivities = ({ className, showAll }: IProps) => {
  return (
    <ul
      className={cn(
        " grid grid-cols-3 sm:flex flex-row flex-wrap gap-6",
        className
      )}
    >
      {activities.map((item, i) => (
        <li key={item.label}>
          <Link
            href='/'
            className='bg-white w-full h-[90px] flex items-center gap-[10px] justify-center flex-col sm:min-w-[153px]  rounded-[8px]'
          >
            <Image
              width={item.label === "Swimming" ? 62 : 35}
              height={item.label === "Swimming" ? 40 : 35}
              src={item.image}
              alt={`${item.label} Icon`}
            />
            <p>{item.label}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
