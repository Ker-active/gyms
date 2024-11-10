"use client";

import { ClassDetails, cn } from "@/lib";
import { Clock, User, UserRound } from "lucide-react";
import { HTMLAttributes } from "react";
import { FloatingComponent } from "./floating-component";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  classes?: ClassDetails[];
}

export const ClassInfo = ({ className, classes = [], ...rest }: IProps) => {
  return (
    <ul className={cn("flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-x-[23px] gap-y-[21px]", className)} {...rest}>
      {classes.length == 0 ? (
        <p>No Classes Yet</p>
      ) : (
        <>
          {classes.map((event, index) => (
            <li className="w-[150px] sm:min-w-[195px] px-4 max-w-[230px] py-4 rounded-[16px] bg-[#F3F3F3]" key={index}>
              <div className="flex mb-2 flex-row items-center justify-between">
                <p className="font-semibold">{event.name}</p>
                <FloatingComponent _id={event._id} onlineLink={event.onLinkLink} />
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
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
