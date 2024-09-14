import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export const DateChange = () => {
  return (
    <div className="flex flex-row rounded-full text-sm items-center border border-[#BFBFBF]">
      <button className="w-10 grid place-items-center h-10">
        <ChevronLeft size={18} />
      </button>
      <p className="tracking-[1px] leading-[40px]">{format(new Date(), "dd/MMM/yyyy")}</p>
      <button className="w-10 grid place-items-center h-10">
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
