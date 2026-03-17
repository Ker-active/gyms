"use client";
import { cn, convert24to12 } from "@/lib";
import { Clock, User, UserRound, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { FloatingComponent } from "./floating-component";
import { BookNowModal } from "../shared";
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks, startOfDay } from "date-fns";
// import { IClassResponse } from "@/lib/types";
// import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";

const backgrounds = ["bg-[#F3F3F3]", "bg-[#DFFFFF]", "bg-[#ECF1FF]", "bg-[#FFE7DA]"];

const getOccurrenceOfDay = (date: Date) => {
  const dayName = format(date, "EEEE");
  const dayOfMonth = date.getDate();
  const occurrenceNumber = Math.ceil(dayOfMonth / 7);

  const map: Record<number, string> = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
  };

  const week = map[occurrenceNumber] || "Last";
  const nextWeek = addDays(date, 7);
  const isLast = nextWeek.getMonth() !== date.getMonth();

  return { week, isLast, day: dayName };
};

interface IProps {
  isForTrainer?: boolean;
  classDetails?: any[];
}

export const Classes = ({ isForTrainer = false, classDetails = [] }: IProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [classContent, setClassContent] = useState(null);

  const weekDays = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i)), [currentWeekStart]);
  const isFirstWeek = isSameDay(currentWeekStart, startOfWeek(new Date(), { weekStartsOn: 1 }));

  return (
    <>
      <BookNowModal isOpen={isBookNowModalOpen} setIsOpen={setIsBookNowModalOpen} classContent={classContent as any} />
      <section className="flex flex-col gap-4">
        <div className="flex justify-center w-full mb-2">
          <div className="flex items-center justify-between w-full bg-white border border-[#E6E6E6] rounded-full px-4 py-2 shadow-sm">
            <div className="flex items-center gap-1 border border-[#E6E6E6] rounded-full px-2 py-0.5 bg-white">
              <button disabled={isFirstWeek} onClick={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))} className="p-1 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed">
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-[14px] font-normal text-[#4F4F4F] min-w-[95px] text-center">{format(currentWeekStart, "d/MM/yyyy")}</span>
              <button onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))} className="p-1 cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-[#E0E0E0] rounded-xl overflow-hidden bg-white">
          {weekDays.map((dayDate) => (
            <DayRow
              key={dayDate.toString()}
              dayDate={dayDate}
              classDetails={classDetails}
              isForTrainer={isForTrainer}
              onBook={(item: any, selectedDate: Date) => {
                setClassContent({ ...item, selectedDate });
                setIsBookNowModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

const DayRow = ({ dayDate, classDetails, isForTrainer, onBook }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [showPill, setShowPill] = useState(false);

  const dayName = format(dayDate, "EEEE");
  const dayNum = format(dayDate, "d");
  const isToday = isSameDay(dayDate, new Date());

  const filteredClasses = useMemo(() => {
    return classDetails.filter((item: any) => {
      const targetDate = startOfDay(dayDate);

      if (!item.isRecurring && item.date) {
        return isSameDay(new Date(item.date), targetDate);
      }

      if (item.isRecurring) {
        const start = startOfDay(new Date(item.rangeStart));
        const end = startOfDay(new Date(item.rangeEnd));

        if (targetDate < start || targetDate > end) return false;

        if (item.recurrencePattern === "DAILY") return true;

        if (item.recurrencePattern === "WEEKLY") {
          return item.weekDays?.some((d: string) => d.toLowerCase() === dayName.toLowerCase());
        }

        if (item.recurrencePattern === "MONTHLY") {
          const occurrence = getOccurrenceOfDay(targetDate);
          const dayMatches = occurrence.day.toLowerCase() === item.monthlyRule?.day?.toLowerCase();
          const weekMatches = occurrence.week === item.monthlyRule?.week || (item.monthlyRule?.week === "Last" && occurrence.isLast);
          return dayMatches && weekMatches;
        }
      }
      return false;
    });
  }, [dayDate, classDetails, dayName]);

  const PILL_WIDTH = 140;

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const updatePill = () => {
      const pillEl = pillRef.current;
      if (!pillEl) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
      const maxScroll = scrollWidth - clientWidth;
      const pct = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const available = Math.max(scrollEl.offsetWidth - PILL_WIDTH, 0);
      pillEl.style.transform = `translateX(${pct * available}px)`;
    };

    const checkOverflow = () => {
      setShowPill(scrollEl.scrollWidth > scrollEl.clientWidth + 1);
      updatePill();
    };

    scrollEl.addEventListener("scroll", updatePill, { passive: true });
    window.addEventListener("resize", checkOverflow);
    checkOverflow();

    return () => {
      scrollEl.removeEventListener("scroll", updatePill);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [filteredClasses]);

  return (
    <div className="flex border-b border-[#E0E0E0] last:border-0 relative h-[130px]">
      <div className="w-[85px] min-w-[85px] md:w-[150px] md:min-w-[150px] bg-[#F2F2F2] flex items-center justify-center p-2 border-r border-[#E0E0E0]">
        <div
          className={cn(
            "w-full md:w-[120px] py-2 rounded-full text-[11px] md:text-[13px] font-semibold border text-center shadow-sm",
            isToday ? "bg-[#008080] text-white border-[#008080]" : "bg-white text-[#008080] border-[#008080]",
          )}
        >
          <span className="md:inline hidden">{dayName}</span>
          <span className="md:hidden inline">{dayName.slice(0, 3)}</span> {dayNum}
        </div>
      </div>

      <div className="flex-1 px-4 md:px-6 py-[10px] flex items-center relative overflow-hidden">
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar w-full h-full items-center">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((item: any, index: number) => (
              <div
                key={`${item._id}-${dayDate.getTime()}`}
                className={cn("min-w-[160px] md:min-w-[180px] p-3 rounded-xl flex flex-col shadow-sm h-[110px] justify-center transition-all", backgrounds[index % backgrounds.length])}
              >
                <div className="flex justify-between items-start mb-auto">
                  <h4 className="font-bold text-[#1C1C1C] text-[12px] md:text-[14px] truncate leading-tight pr-1">{item.title}</h4>

                  <FloatingComponent onlineLink={item.onlineLink} _id={item._id} shareableLink={item.shareableLink} />
                </div>

                <div className="flex items-center gap-1.5 text-[10px] md:text-[12px] text-[#4F4F4F] mt-1 font-medium">
                  <Clock size={13} className="text-[#008080]" />
                  <span className="truncate">
                    {convert24to12(item.timeFrom)} - {convert24to12(item.timeTo)}
                  </span>
                </div>

                {!isForTrainer && (
                  <>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-[12px] text-[#4F4F4F] truncate">
                      <UserRound size={13} className="text-[#008080]" />
                      <span className="truncate">{item.trainer?.fullname}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-[12px] text-[#4F4F4F]">
                      <User size={13} className="text-[#008080]" />
                      <span>
                        {item.totalBooked}/{item.totalSlots ?? item.totalSlot}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-[13px] italic">No classes scheduled</div>
          )}
        </div>

        {filteredClasses.length > 0 && (
          <div className="absolute bottom-0 left-4 right-4 h-[6px] pointer-events-none z-10">
            <div className="w-full h-[3px] bg-[#F2F2F2] rounded-full absolute bottom-0" />
            <div
              ref={pillRef}
              className={cn("h-[6px] bg-[#008080] rounded-full absolute bottom-0 left-0 will-change-transform shadow-sm transition-opacity duration-300", showPill ? "opacity-100" : "opacity-0")}
              style={{ width: `${PILL_WIDTH}px` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
