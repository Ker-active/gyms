"use client";

import { useMemo, useState } from "react";
import DateCalendarNavigation from "../shared/date-calendar-navigation";
import { useGetDashboardMetricWeekly } from "@/hooks/shared";
import { LoadingComponent } from "../shared";

// import DateCalendarNavigation from "@/components/shared/date-calendar-navigation";
// import { LoadingComponent } from "@/components/shared";
// import { useGetDashboardMetricWeekly } from "@/hooks/dashboard";

interface WeeklyMetricsProps {
  className?: string;
}

export default function WeeklyMetrics({ className = "" }: WeeklyMetricsProps) {
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());
  const { data: weeklyMetrics, isPending: isWeeklyPending } = useGetDashboardMetricWeekly(selectedWeekDate);

  const defaultWeekStarting = useMemo(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const defaultMetrics = {
    weekStarting: "YYY-MM-DD",
    totalClasses: 0,
    totalPayments: 0,
    totalAttendance: 0,
  };
  const metricsToRender = weeklyMetrics?.data ?? defaultMetrics;

  const handleWeekDateChange = (date: Date) => {
    setSelectedWeekDate(date);
  };

  console.log("Weekly Metrics Data:", weeklyMetrics);

  return (
    <article className={`bg-white space-y-[21px] px-[20px] py-[33px] ${className}`}>
      <header className="flex flex-row items-center justify-between">
        <h3 className="font-medium text-base">This week</h3>
        <DateCalendarNavigation initialDate={selectedWeekDate} onChange={handleWeekDateChange} />
      </header>

      <ul className="space-y-[13px]">
        {Object.entries(metricsToRender).map(([key, value]) => (
          <li key={key} className="h-[90px] bg-[#F5F5F5] text-[#1C1939] flex flex-col justify-between py-4 px-6 border-b border-[#E6E6E6]">
            <p className="text-[12px] capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
            <p className="text-[22px] font-semibold">{value}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

// {isWeeklyPending ? (
//         <div className="flex justify-center py-8">
//           <LoadingComponent />
//         </div>
//       ) : (
//         <ul className="space-y-[13px]">
//           {weeklyMetrics?.data ? (
//             Object.entries(weeklyMetrics.data).map(([key, value], index) => (
//               <li key={key} className="h-[90px] bg-[#F5F5F5] text-[#1C1939] flex flex-col justify-between py-4 px-6 border-b border-[#E6E6E6]">
//                 <p className="text-[12px] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
//                 <p className="text-[22px] font-semibold">{value}</p>
//               </li>
//             ))
//           ) : (
//             Array.from({ length: 4 }).map((_, index) => (
//               <li key={index} className="h-[90px] bg-[#F5F5F5] text-[#1C1939] flex flex-col justify-between py-4 px-6 border-b border-[#E6E6E6]">
//                 <p className="text-[12px]">Classes</p>
//                 <p className="text-[22px] font-semibold">0</p>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
