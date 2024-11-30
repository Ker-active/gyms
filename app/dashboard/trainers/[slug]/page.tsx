"use client";

import { AddReview, ListInfo, LoadingComponent, ReviewComponent, SectionSocialMedia, Trainers } from "@/components/shared";
import Image from "next/image";
import { Classes } from "@/components/classes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useGetTrainer } from "@/hooks/shared";

const TrainersMedia = [
  {
    grid: "area-one",
    url: "/images/trainers/trainer1.png",
  },
  {
    grid: "area-two",
    url: "/images/trainers/trainer2.png",
  },
  {
    grid: "area-three",
    url: "/images/trainers/trainer3.png",
  },
  {
    grid: "area-four",
    url: "/images/trainers/trainer4.png",
  },
  {
    grid: "area-five",
    url: "/images/trainers/trainer5.png",
  },
];

export default function TrainersDetails({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data, isPending } = useGetTrainer(params.slug);

  return (
    <section className="flex min-h-full flex-col w-full font-inter gap-10">
      <header className="flex gap-4 flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF] " onClick={() => router.back()} size="icon">
            <ArrowLeft color="#737373" />
          </Button>
          <h2 className="section-header">Trainers Profile</h2>
        </div>

        <Button variant="outline" className="border w-fit">
          Deactivate
        </Button>
      </header>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <section className="flex  flex-col gap-[40px]">
          <section className="bg-white flex flex-col lg:flex-row gap-4 lg:gap-8 xl:gap-[50px] px-[23px] py-[34px] rounded-[10px]">
            <div className="w-full border relative max-w-[279px] h-[292px]">
              <Image className="object-contain" fill alt="Trainers' Image" src={data?.data.profilePhoto || data?.data.media[0] || ""} />
            </div>

            <article className="flex flex-col w-full gap-[22px]">
              <header>
                <h2 className="text-[#1C1939] font-bold text-lg lg:text-2xl">{data?.data.fullname}</h2>
                <p className="text-[#737373]">{data?.data.services.join(", ")}</p>
                <a className="text-[#3385FF]" href="#">
                  @ker-Fitness
                </a>
              </header>
              <p className="text-[#6B6868]">{data?.data.professionalSummary}</p>
              <ListInfo title="Special Services" item={["Pre-natal", "Post-natal", "BasketBall"]} />
              <div className="space-y-[10px] text-[#1C1C1C]">
                <h2 className="text-lg font-bold">Contacts</h2>
                <SectionSocialMedia
                  data={{
                    phone: data?.data.phoneNumber || "",
                    email: data?.data.email || "",
                    ...data?.data.socialMedia,
                  }}
                />
              </div>
            </article>
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="section-header">Media</h2>
            <section className="bg-white gap-4 grid-container p-4">
              {data?.data.media.map((media, index) => (
                <div key={index} className="relative border w-full">
                  <Image fill src={media} alt="Trainer's media" />
                </div>
              ))}
              {/* {TrainersMedia.map((trainer) => (
                <div key={trainer.grid} className={`relative w-full ${trainer.grid}`}>
                  <Image fill src={trainer.url} alt="Trainer's media" />
                </div>
              ))} */}
            </section>
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="section-header">Classes</h2>
            <Classes isForTrainer />
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="section-header">Reviews</h2>
            <ReviewComponent hideAddButton />
          </section>
        </section>
      )}
    </section>
  );
}
