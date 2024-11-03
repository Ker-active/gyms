"use client";

import { Event } from "@/components/event/event";
import { ComponentLoading, Empty } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { useGetEvents } from "@/hooks/shared";
import { cn, Routes } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<"upcoming" | "past">("upcoming");
  const { data, isLoading } = useGetEvents(currentTab);

  function EditEvent(eventId: string) {
    router.push(`${Routes["add-event"]}?eventId=${eventId}`);
  }

  return (
    <section className="flex min-h-full flex-col w-full font-inter gap-10">
      <header className="flex flex-col gap-4 sm:flex-row items-start justify-between">
        <div className="relative w-[220px] h-[40px] bg-white rounded-full shadow-md overflow-hidden">
          <div className={cn("absolute top-0 left-0 w-1/2 h-full bg-primary transition-transform duration-300 ease-in-out", currentTab === "upcoming" ? "translate-x-0" : "translate-x-full")} />
          {["upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab as "upcoming" | "past")}
              className={cn(
                "absolute top-0 h-full px-4 w-1/2 text-sm font-medium capitalize transition-colors duration-300",
                tab === "upcoming" ? "left-0" : "right-0",
                currentTab === tab ? "text-white" : "text-gray-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <Link href={Routes["add-event"]} className={buttonVariants({ size: "sm" })}>
          Add Event
        </Link>
      </header>
      <>
        {isLoading ? (
          <ComponentLoading />
        ) : (
          <>
            {data?.data.length == 0 ? (
              <Empty alt="Certificate Svg" src="/calendar.png" desc="You do not have any event yet. Your events would appear here. " href={Routes["add-event"]} linkText="Add Event" />
            ) : (
              <ul
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                }}
                className={cn("grid gap-[25px]")}
              >
                {data?.data.map((event, i) => (
                  <Event
                    event={event}
                    isEdit
                    callToActionButton={() => {
                      if (currentTab == "past") return toast.success("You can't edit what is already past");
                      EditEvent(event._id);
                    }}
                    key={i}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </>
    </section>
  );
}
