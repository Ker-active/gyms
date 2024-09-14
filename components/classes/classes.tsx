import { cn, Routes } from "@/lib";
import { Clock, User, UserRound } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FloatingComponent } from "./floating-component";
import { ClassInfo } from "./class-info";
import Link from "next/link";

const timeTable = [
  {
    day: "Monday",
    classes: [
      {
        name: "Yoga",
        trainer: "John Doe",
        time: "10am - 11am",
      },
      {
        name: "Yoga",
        trainer: "John Doe",
        time: "10am - 11am",
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [{ name: "Yoga", trainer: "John Doe", time: "10am - 11am" }],
  },
  {
    day: "Wednesday",
    classes: [{ name: "Yoga", trainer: "John Doe", time: "10am - 11am" }],
  },
  {
    day: "Thurday",
    classes: [{ name: "Yoga", trainer: "John Doe", time: "10am - 11am" }],
  },
  {
    day: "Friday",
    classes: [{ name: "Yoga", trainer: "John Doe", time: "10am - 11am" }],
  },
  {
    day: "Saturday",
    classes: [{ name: "Yoga", trainer: "John Doe", time: "10am - 11am" }],
  },
  {
    day: "Sunday",
    classes: [{ name: "Yoga", trainer: "John Doe", time: "10am - 11am" }],
  },
];

const backgrounds = ["bg-[#F3F3F3]", "bg-[#DFFFFF]", "bg-[#ECF1FF]", "bg-[#FFE7DA]"];

interface IProps {
  isForTrainer?: boolean;
}

export const Classes = ({ isForTrainer = false }: IProps) => {
  return (
    <section className="flex flex-col">
      {timeTable.map((day) => (
        <div key={day.day} className="w-full border-b text-[#1C1939] border-[#E0E0E0] flex flex-row">
          <div className={cn(" min-w-[118px] bg-[#EEEEEE] grid place-content-center h-[140px]", isForTrainer && "h-[100px]")}>
            <p>{day.day}</p>
          </div>

          <div className="flex relative no-scrollbar  overflow-x-auto bg-white gap-[30px] px-4 w-full flex-row items-center">
            {day.classes.map((event, index) => {
              return (
                <Link
                  href={`${Routes["class-details"]}/hello`}
                  className={cn("px-4  min-w-[195px] pb-[11px] pt-4 rounded-[16px]", isForTrainer && "h-[80px]", backgrounds[(index + timeTable.indexOf(day)) % backgrounds.length])}
                  key={index}
                >
                  <div className="flex mb-2 flex-row items-center justify-between">
                    <p className="font-semibold">{event.name}</p>
                    <FloatingComponent />
                  </div>
                  <div className="flex mb-1 gap-2 items-center flex-row">
                    <Clock size={16} />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  {!isForTrainer && (
                    <>
                      <div className="flex gap-2 mb-1 items-center flex-row">
                        <UserRound size={16} />
                        <span className="text-sm">{event.trainer}</span>
                      </div>
                      <div className="flex gap-2 items-center flex-row">
                        <User size={16} />
                        <span className="text-sm">8/12</span>
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};
