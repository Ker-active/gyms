"use client";

import { FilterHeader, Trainers } from "@/components/shared";
import { Button } from "@/components/ui/button";

export default function TrainersPage() {
  return (
    <section className="flex min-h-full flex-col font-inter gap-10">
      <header className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-between">
        <div className="flex flex-row w-full gap-[18px] items-center">
          <h2 className="section-header">Trainers and Coaches</h2>
        </div>
        <Button size="sm">Add Trainer</Button>
      </header>
      <Trainers showAll />
    </section>
  );
}
