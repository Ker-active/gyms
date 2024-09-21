import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Event } from "../event/event";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
}

export const FitnessEvent = ({ className, showAll }: IProps) => {
  return (
    <ul className={cn("grid grid-cols-auto-fit-three gap-[28px]", className)}>
      {Array.from({ length: showAll ? 3 : 3 }).map((_, i) => (
        <Event key={i} />
      ))}
    </ul>
  );
};
