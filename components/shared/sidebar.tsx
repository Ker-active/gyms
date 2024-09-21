"use client";

import { Routes } from "@/lib";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

const links = [
  {
    label: "Dashboard",
    icon: "/dashboard.svg",
  },
  {
    label: "Schedule",
    icon: "/message.svg",
  },
  {
    label: "Trainers",
    icon: "/trainers.svg",
  },

  {
    label: "Members",
    icon: "/members.svg",
  },
  {
    label: "Reviews",
    icon: "/reviews.svg",
  },
  // {
  //   label: "Messages",
  //   icon: "/message.svg",
  // },
  {
    label: "Events",
    icon: "/calender.svg",
  },
  {
    label: "Pricing",
    icon: "/pricing.svg",
  },
] as const;

interface IProps extends HTMLAttributes<HTMLDivElement> {
  setIsSidebarOpen?: (value: boolean) => void;
}

export const Sidebar = ({ className, setIsSidebarOpen }: IProps) => {
  const pathname = usePathname();
  return (
    <aside className={cn("w-full overflow-y-auto min-w-[220px] max-w-[220px] h-full bg-white border-r-[0.7px] border-[#DCDCDC]", className)}>
      <ul className={"flex flex-col pt-[44px] gap-10"}>
        {links.map((item) => {
          const href = item.label === "Dashboard" ? Routes.home : `/dashboard/${item.label.toLowerCase()}`;

          return (
            <li className="flex flex-row px-10  items-center gap-4" key={item.label}>
              <Image src={item.icon} width={27} height={27} alt={`${item.label} Icon`} />
              <Link onClick={() => setIsSidebarOpen?.(false)} className={cn("text-[#565C78] text-base", pathname.includes(href) && "text-brand font-medium")} href={href}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
