import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Event } from "../event/event";
import { useGetEvents } from "@/hooks/shared";
import { LoadingComponent } from "./loading";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
}

export const FitnessEvent = ({ className, showAll }: IProps) => {
  const { data, isPending } = useGetEvents();
  if (isPending) return <LoadingComponent />;
  return (
    <ul className={cn("grid grid-cols-auto-fit-three gap-[28px]", className)}>
      {/* {Array.from({ length: showAll ? 3 : 3 }).map((_, i) => (
        <Event key={i} />
      ))} */}
    </ul>
  );
};
