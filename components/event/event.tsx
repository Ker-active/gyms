"use client";

import { IEvent } from "@/lib/types";
import { Button } from "../ui/button";
import { Bookmark, Calendar, Clock, MapPin, Pencil, Share2, UserRound } from "lucide-react";
import Image from "next/image";
import { ElementType, ComponentPropsWithoutRef } from "react";
import { format } from "date-fns";
import { convert24to12 } from "@/lib";

type EventProps<T extends ElementType> = {
  as?: T;
  event: IEvent;
  isEdit?: boolean;
  callToActionButton?: () => void;
} & ComponentPropsWithoutRef<T>;

export const Event = <T extends ElementType = "li">({ as, callToActionButton, isEdit = false, event, className = "", ...props }: EventProps<T>) => {
  const Component = as || "li";

  return (
    <Component className={`bg-white pb-[18px] pt-4 rounded-[5px] w-full text-[#1C1939] ${className}`} {...props}>
      <article className="flex gap-[30px] flex-col">
        <header>
          <div className="relative w-full h-[200px] sm:h-[187px]">
            <Image className="object-contain" alt="Fitness Event Image" fill src={event?.media[0]} />
          </div>
          <div className="px-[18px] flex flex-row justify-between items-center pt-[18px]">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <Button onClick={callToActionButton} style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }} variant="ghost" size="icon" className="bg-[#F4F2F2]  rounded-[10px] place-self-end">
              {isEdit ? <Pencil size={20} color="#1C1C1C" /> : <Bookmark size={24} color="#1C1C1C" />}
            </Button>
          </div>
        </header>
        <section className="px-[18px] space-y-[12px] text-[#737373]">
          <div className="flex items-center gap-2  flex-row">
            <Calendar size={18} />
            <p>{format(new Date(event.date), "dd MMM yyyy")} </p>
          </div>
          <div className="flex items-center gap-2  flex-row">
            <Clock size={18} />
            <p>
              {convert24to12(event?.timeFrom)}-{convert24to12(event?.timeTo)}
            </p>
          </div>
          <div className="flex items-center gap-2  flex-row">
            <MapPin size={18} />
            <p>{event.location}</p>
          </div>
        </section>

        <footer className="w-full px-[18px] justify-between gap-6 items-center flex flex-row">
          <Button disabled={event.free} className="font-semibold text-sm text-off-white">
            {event.free ? "Free" : `Get Ticket for ₦${event.price}`}{" "}
          </Button>
          <Button style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }} variant="ghost" size="icon" className="min-w-[45px] bg-[#F4F2F2] h-[45px] rounded-[10px] place-self-end">
            <Share2 size={26} color="#1C1C1C" />
          </Button>
        </footer>
      </article>
    </Component>
  );
};
