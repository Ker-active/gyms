"use client";
import { ReviewComponent } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <section className="flex min-h-full flex-col w-full font-inter gap-10">
      <header className="flex flex-col gap-4 sm:flex-row items-start justify-between">
        <div className="flex flex-row items-center gap-2">
          <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF]" onClick={() => router.back()} size="icon">
            <ArrowLeft color="#737373" />
          </Button>
          <h2 className="section-header">Reviews and Ratings</h2>
        </div>
      </header>
      <ReviewComponent hideAddButton />
    </section>
  );
}
