"use client";
import WeeklyMetrics from "@/components/calender/weekly-metrics-summary";
import { ClassInfo } from "@/components/classes/class-info";
import { DateChange, LoadingComponent } from "@/components/shared";
import DateCalendarNavigation from "@/components/shared/date-calendar-navigation";
import { Button } from "@/components/ui/button";
import { useGetClasss } from "@/hooks/shared";
import { getClassesForDate, getClassesForDateArray, Routes } from "@/lib";
import Link from "next/link";
import { useMemo } from "react";

export default function Root() {
  const { data, isPending } = useGetClasss();
  const classesInfo = useMemo(() => {
    return {
      today: getClassesForDateArray(data?.data ?? [], new Date()),
      tomorrow: getClassesForDateArray(data?.data ?? [], new Date(new Date().setDate(new Date().getDate() + 1))),
    };
  }, [data]);

  if (isPending) return <LoadingComponent />;

  return (
    <section className="w-full  space-y-6 font-inter">
      <section className="space-y-[21px]">
        <h2 className="font-medium text-base">Today</h2>
        <ClassInfo classes={classesInfo.today} className="bg-white py-[20px] px-[13px]" />
      </section>
      <section className="grid grid-cols gap-[20px] md:grid-cols-2">
        <article className="bg-white px-[20px] py-[33px]">
          <div className=" flex justify-between items-center">
            <h3 className="font-medium text-base">Tomorrow</h3>
          </div>
          <ClassInfo classes={classesInfo.tomorrow} className="py-[20px]" />
          <div className="">
            {classesInfo.tomorrow.length >= 6 ? (
              <Link className="flex justify-center items-center  text-[#565C78] capitalize" href={Routes.schedule}>
                <Button>
                  <span className="font-inter text-sm capitalize">load more</span>
                </Button>
              </Link>
            ) : null}
          </div>
        </article>
        <WeeklyMetrics />
        {/* <article className="bg-white space-y-[21px] g px-[20px] py-[33px]">
          <header className="flex flex-row items-center justify-between">
            <h3 className="font-medium text-base">This week</h3>
            <DateCalendarNavigation />
          </header>
          <ul className="space-y-[13px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className="h-[90px] bg-[#F5F5F5] text-[#1C1939] flex flex-col justify-between py-4 px-6 border-b border-[#E6E6E6]">
                <p className="text-[12px]">Classes</p>
                <p className="text-[22px] font-semibold">0</p>
              </li>
            ))}
          </ul>
        </article> */}
      </section>
    </section>
  );
}
