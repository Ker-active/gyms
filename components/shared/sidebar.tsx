"use client";

import { clearCookie } from "@/actions/shared";
import { useGetUser } from "@/hooks/shared";
import { Routes } from "@/lib";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { HTMLAttributes, startTransition } from "react";

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
  // {
  //   label: "Reviews",
  //   icon: "/reviews.svg",
  // },
  // {
  //   label: "Messages",
  //   icon: "/message.svg",
  // },
  // {
  //   label: "Events",
  //   icon: "/calender.svg",
  // },
  {
    label: "Pricing",
    icon: "/pricing.svg",
  },
  {
    label: "Profile",
    icon: "/members.svg",
  },
  {
    label: "Logout",
    icon: "/members.svg",
  },
] as const;

interface IProps extends HTMLAttributes<HTMLDivElement> {
  setIsSidebarOpen?: (value: boolean) => void;
}

export const Sidebar = ({ className, setIsSidebarOpen }: IProps) => {
  const pathname = usePathname();
  const { data: userData, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  return (
    <aside className={cn("w-full fixed left-0 overflow-y-auto min-w-[220px] max-w-[220px] h-full bg-white border-r-[0.7px] border-[#DCDCDC]", className)}>
      <ul className={"flex flex-col pt-[44px] gap-10"}>
        {links.map((item) => {
          const href = item.label === "Dashboard" ? Routes.home : `/dashboard/${item.label.toLowerCase()}`;
          const isDisabled = isLoading || !userData?.data?.fullname;
          return (
            <li className="flex flex-row px-10 items-center gap-4" key={item.label}>
              {item.label != "Logout" && <Image src={item.icon} width={27} height={27} alt={`${item.label} Icon`} style={{ opacity: isDisabled ? 0.5 : 1 }} />}
              {isDisabled ? (
                <span className="text-[#E1E2E7] text-base cursor-not-allowed">{item.label}</span>
              ) : (
                <>
                  {item.label == "Logout" ? (
                    <button
                      onClick={() => {
                        startTransition(async () => {
                          await clearCookie();
                          queryClient.clear();
                          router.replace(Routes.login);
                        });
                      }}
                      className="text-red-500 text-base"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link onClick={() => setIsSidebarOpen?.(false)} className={cn("text-[#565C78] text-base", pathname.includes(href) && "text-brand font-medium")} href={href}>
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
