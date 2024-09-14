import { AddClass, Classes } from "@/components/classes";
import { DateChange } from "@/components/shared";
import { Button, buttonVariants } from "@/components/ui/button";
import { Routes } from "@/lib";
import Link from "next/link";

export default function Class() {
  return (
    <section className=" flex flex-col gap-6">
      <header className="flex flex-row items-center w-full justify-between px-[20px]">
        <h2 className="section-header">Fitness Classes</h2>
        <div className="flex flex-row items-center gap-4">
          <DateChange />
          <Link href={Routes["add-class"]} className={buttonVariants({ size: "sm" })}>
            Add Class
          </Link>
        </div>
      </header>
      <div className="h-full bg-white w-full grid place-items-center">
        <p className="text-[#5B5971] text-[13px] text-center">
          You do not have any class add yet.{" "}
          <Link href={Routes["add-class"]} className="text-primary">
            Add Class
          </Link>
        </p>
      </div>
      <div className="pb-6">
        <Classes />
      </div>
    </section>
  );
}
