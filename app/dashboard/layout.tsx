/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AvatarName, LoadingComponent, Sidebar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, SquareMenu, User } from "lucide-react";
import Image from "next/image";
import { ReactNode, useLayoutEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Routes } from "@/lib";
import { useGetUser } from "@/hooks/shared";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "nextjs-toploader/app";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading } = useGetUser();
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    if (data && !data.data.location) {
      return router.replace(Routes.profile);
    }
  }, [data, pathname]);

  if (isLoading || !data) {
    return (
      <div className="h-svh flex w-screen">
        <LoadingComponent />;
      </div>
    );
  }

  return (
    <main className="h-svh w-screen font-inter overflow-hidden bg-off-white">
      <header className="h-[70px] top-0 left-0 fixed bg-white w-full flex flex-row items-center justify-between border-[1px] sm:px-[40px] px-4 border-b-[#F3F3F3]">
        <Link href={Routes.home}>
          <Image alt="Ker Active Logo" src="/green-logo.svg" width={139} height={20} />
        </Link>
        <div className="flex-row  flex items-center gap-6">
          <Bell fill="#5B5971" color="#5B5971" size={20} />
          <Popover>
            <PopoverTrigger>
              <AvatarName useInNavbar data={data.data} />
            </PopoverTrigger>
            <PopoverContent className="rounded-[9px] min-[250px] flex flex-col px-[27px] gap-4" sideOffset={15} align="end">
              <Link className="flex flex-row gap-2  items-center  text-[#565C78]" href={Routes.profile}>
                <User size={20} /> <span className="font-inter text-sm">My Account</span>
              </Link>
              <Link className="flex flex-row gap-2  items-center  text-[#565C78]" href={Routes.account}>
                <Bookmark size={20} />
                <span className="font-inter text-sm">Saved Items</span>
              </Link>
            </PopoverContent>
          </Popover>

          <Sheet onOpenChange={setIsSidebarOpen} open={isSidebarOpen}>
            <SheetTrigger asChild>
              <Button className="flex sm:hidden" variant="outline" size="icon">
                <SquareMenu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Sidebar setIsSidebarOpen={setIsSidebarOpen} className="border-0" />
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <section className="h-[calc(100svh-70px)] overflow-hidden mt-[70px] flex flex-row w-full">
        <Sidebar className="hidden sm:block" />
        <div className="px-4 sm:ml-[220px] overflow-y-auto py-6 flex-grow w-full lg:px-[48px] sm:py-[35px]">{children}</div>
      </section>
    </main>
  );
}
