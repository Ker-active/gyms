"use client";
import { Classes } from "@/components/classes";
import { DateChange, LoadingComponent } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { useGetClasss } from "@/hooks/shared";
import { Routes } from "@/lib";
import Link from "next/link";

export default function Class() {
  const { data, isLoading } = useGetClasss();

  return (
    <section className=" flex flex-col gap-6">
      <header className="flex flex-row sm:items-center w-full justify-between sm:px-[20px]">
        <h2 className="section-header">Fitness Classes</h2>
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-10 sm:gap-4">
          {/* <DateChange /> */}
          <Link href={Routes["add-class"]} className={buttonVariants({ size: "sm" })}>
            Add Class
          </Link>
        </div>
      </header>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {data?.data.length == 0 ? (
            <div className="h-full  bg-white w-full grid place-items-center">
              <p className="text-[#5B5971] text-[13px] text-center">
                You do not have any class add yet.{" "}
                <Link href={Routes["add-class"]} className="text-primary">
                  Add Class
                </Link>
              </p>
            </div>
          ) : (
            <div className="pb-6">
              <Classes classDetails={data?.data ?? []} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
