import { cn, Routes } from "@/lib";
import { Clock, User, UserRound } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FloatingComponent } from "./floating-component";
import { ClassInfo } from "./class-info";
import Link from "next/link";
import { IClassResponse } from "@/lib/types";
import { memo, useMemo } from "react";
import { format } from "date-fns";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const backgrounds = ["bg-[#F3F3F3]", "bg-[#DFFFFF]", "bg-[#ECF1FF]", "bg-[#FFE7DA]"];

interface IProps {
  isForTrainer?: boolean;
  classDetails?: IClassResponse["data"];
}

interface IClassArray {
  day: string;
  classes: {
    name: string;
    trainer: string;
    time: string;
    onlineLink: string;
    classId: string;
  }[];
}

function formatClass(classDetails: IClassResponse["data"]) {
  if (!classDetails) return [];
  return classDetails.reduce((acc, item) => {
    const day = format(new Date(item.date), "EEEE");
    const classDetails = {
      name: item.title,
      trainer: item.trainer?.fullname, // Get the trainer name
      time: `${item.timeFrom} - ${item.timeTo}`,
      classId: item._id,
      onlineLink: item.onlineLink,
    };

    const existingDay = acc.find((d) => d.day === day);
    if (existingDay) {
      existingDay.classes.push(classDetails);
    } else {
      acc.push({
        day,
        classes: [classDetails],
      });
    }

    return acc;
  }, [] as IClassArray[]);
}

export const Classes = ({ isForTrainer = false, classDetails }: IProps) => {
  const timeTable = useMemo(() => {
    const groupedData = formatClass(classDetails || []);
    return weekDays.map((day) => {
      const foundDay = groupedData.find((d) => d.day === day);
      return foundDay || { day, classes: [] };
    });
  }, [classDetails]);

  return (
    <section className="flex flex-col">
      {timeTable.map((day) => (
        <div key={day.day} className="w-full border-b text-[#1C1939] border-[#E0E0E0] flex flex-row">
          <div className={cn(" min-w-[118px] bg-[#EEEEEE] grid place-content-center h-[140px]", isForTrainer && "h-[100px]")}>
            <p>{day.day}</p>
          </div>

          <div className="flex relative [@media(max-width:600px)]:no-scrollbar   overflow-x-auto bg-white gap-[30px] sm:pt-1 px-4 w-full flex-row items-center">
            {day.classes.map((event, index) => {
              return (
                <div className={cn("px-4  min-w-[195px] pb-[11px] pt-4 rounded-[16px]", isForTrainer && "h-[80px]", backgrounds[(index + timeTable.indexOf(day)) % backgrounds.length])} key={index}>
                  <div className="flex mb-2 flex-row items-center justify-between">
                    <p className="font-semibold">{event.name}</p>
                    <FloatingComponent onlineLink={event.onlineLink} _id={event.classId} isForTrainer={isForTrainer} />
                  </div>
                  <div className="flex mb-1 gap-2 items-center flex-row">
                    <Clock size={16} />
                    <span className="text-sm w-full line-clamp-1 text-ellipsis">{event.time}</span>
                  </div>
                  {!isForTrainer && (
                    <>
                      <div className="flex gap-2 mb-1 items-center flex-row">
                        <UserRound size={16} />
                        <span className="text-sm w-full line-clamp-1 text-ellipsis">{event.trainer}</span>
                      </div>
                      <div className="flex gap-2 items-center flex-row">
                        <User size={16} />
                        <span className="text-sm w-full">8/12</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

Classes.displayName = "Classes";
