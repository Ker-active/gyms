"use client";

import { Trainers } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/lib";
import Link from "next/link";

export default function TrainersPage() {
  return (
    <section className="flex min-h-full flex-col font-inter gap-10">
      <header className="flex  gap-4 flex-row items-center justify-between">
        <div className="flex flex-row w-full gap-[18px] items-center">
          <h2 className="section-header">Trainers and Coaches</h2>
        </div>
        <Link href={Routes["add-trainer"]} className={buttonVariants({ size: "sm" })}>
          Add Trainer
        </Link>
      </header>
      <Trainers showAll />
    </section>
  );
}
