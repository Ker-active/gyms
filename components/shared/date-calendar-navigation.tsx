"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateCalendarNavigationProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export default function DateCalendarNavigation({ initialDate = new Date(), onChange, className }: DateCalendarNavigationProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "/");
  };

  const navigate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div className="flex flex-row rounded-full text-sm items-center border border-[#BFBFBF]">
      <button onClick={() => navigate("prev")} className="w-10 grid place-items-center h-10">
        <ChevronLeft size={18} />
      </button>
      <p className="tracking-[1px] leading-[40px]">{formatDate(currentDate)}</p>
      <button onClick={() => navigate("next")} className="w-10 grid place-items-center h-10">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// return (
//     <div className={cn("flex items-center justify-between bg-white border border-gray-200 rounded-full px-4 py-2 w-fit", className)}>
//       <button onClick={() => navigate("prev")} className="flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Previous day">
//         <ChevronLeft className="h-4 w-4" />
//       </button>

//       <span className="mx-3 text-sm font-medium text-gray-700">{formatDate(currentDate)}</span>

//       <button onClick={() => navigate("next")} className="flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Next day">
//         <ChevronRight className="h-4 w-4" />
//       </button>
//     </div>
//   );
