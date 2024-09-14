"use client";
import { PersonalInformation, Subscription } from "@/components/account";
import { MyCalendar } from "@/components/calender/calender";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const rightElementRef = useRef<HTMLDivElement>(null);
  const [rightElementHeight, setRightElementHeight] = useState(400);

  useEffect(() => {
    if (rightElementRef.current) {
      setRightElementHeight(rightElementRef.current.clientHeight);
    }
  }, []);

  return (
    <section className='flex min-h-full mb-[120px] sm:mb-0 flex-col font-inter gap-6 sm:gap-10'>
      <h2 className='section-header'>My Account</h2>
      <section className='h-full gap-8 grid grid-cols-1 md:grid-cols-2'>
        <MyCalendar height={rightElementHeight} />
        <div
          ref={rightElementRef}
          className='flex rounded-[5px]   flex-col w-full gap-4'
        >
          <Subscription />
          <PersonalInformation />
        </div>
      </section>
    </section>
  );
}
