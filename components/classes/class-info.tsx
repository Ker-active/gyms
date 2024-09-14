"use client";

import { cn, Routes } from "@/lib";
import { Clock, User, UserRound } from "lucide-react";
import { HTMLAttributes } from "react";
import { FloatingComponent } from "./floating-component";
import Link from "next/link";

const classesArray = [
  { name: "Yoga", trainer: "John Doe", time: "10am - 11am" },
  { name: "Yoga", trainer: "John Doe", time: "10am - 11am" },
  { name: "Yoga", trainer: "John Doe", time: "10am - 11am" },
  { name: "Yoga", trainer: "John Doe", time: "10am - 11am" },
];

interface IProps extends HTMLAttributes<HTMLUListElement> {}

export const ClassInfo = ({ className, ...rest }: IProps) => {
  return (
    <ul className={cn("flex flex-row flex-wrap items-center gap-x-[23px] gap-y-[21px]", className)} {...rest}>
      {classesArray.map((event, index) => (
        <li className="min-w-[195px] px-4 max-w-[230px] py-4 rounded-[16px] bg-[#F3F3F3]" key={index}>
          <Link href={`${Routes["class-details"]}/hello`}>
            <div className="flex mb-2 flex-row items-center justify-between">
              <p className="font-semibold">{event.name}</p>
              <FloatingComponent />
            </div>
            <div className="flex mb-1 gap-2 items-center flex-row">
              <Clock size={16} />
              <span className="text-sm">{event.time}</span>
            </div>

            <div className="flex gap-2 mb-1 items-center flex-row">
              <UserRound size={16} />
              <span className="text-sm">{event.trainer}</span>
            </div>
            <div className="flex gap-2 items-center flex-row">
              <User size={16} />
              <span className="text-sm">8/12</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
