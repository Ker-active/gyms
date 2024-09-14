import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { View } from "react-big-calendar";

interface CustomToolbarProps {
  onView: (view: View) => void;
  label: string;
  view: View;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  onView,
  label,
  view,
}) => {
  const goToPrev = () => {
    switch (view) {
      case "month":
        onView("week");
        break;
      case "week":
        onView("day");
        break;
      // If already at 'day', do nothing
    }
  };

  const goToNext = () => {
    switch (view) {
      case "day":
        onView("week");
        break;
      case "week":
        onView("month");
        break;
      // If already at 'month', do nothing
    }
  };

  return (
    <div className='flex justify-between font-inter  px-[8px] py-[10px]'>
      <div className='bg-off-white  rounded-[6px] flex items-center'>
        <button onClick={goToPrev} className='px-1' disabled={view === "day"}>
          <ChevronLeft size={16} />
        </button>
        <span className='text-[#18181B] text-center min-w-[80px] py-[3px] px-2 border-x-2 text-[12px] '>
          {view == "day"
            ? "Today"
            : view == "week"
            ? "This Week"
            : "This Month"}
        </span>
        <button onClick={goToNext} className='px-1' disabled={view === "month"}>
          <ChevronRight size={16} />
        </button>
      </div>
      <span className=' text-[#1c1c1c] font-bold'>{label}</span>
      <div className='opacity-0' aria-hidden>
        hidden
      </div>
    </div>
  );
};
