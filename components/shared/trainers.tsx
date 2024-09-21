import { Routes } from "@/lib";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  showAll?: boolean;
}

export const Trainers = ({ showAll = false }: IProps) => {
  return (
    <ul className="grid grid-cols-auto-fit-four gap-x-[40px] gap-y-8 sm:gap-y-[60px]">
      {Array.from({ length: showAll ? 16 : 4 }).map((_, i) => (
        <li key={i} className="flex items-center sm:items-start flex-col">
          <div className="w-full min-w-[200px] max-w-[200px] border-[7px] overflow-hidden border-brand rounded-full h-[200px] relative">
            <Image fill src="https://avatars.githubusercontent.com/u/42998943?v=4" alt="Trainers" />
          </div>
          <p className="text-[#344054] mt-[30px] sm:mt-[40px] leading-[24px] font-inter font-semibold  text-xl">David Mark</p>
          <p className="text-[#667085] text-base font-inter">Strength training, Cardio.</p>
          <Link className="underline text-sm text-orange-950" href={`${Routes.trainers}/${Math.random()}`}>
            View Profile
          </Link>
        </li>
      ))}
    </ul>
  );
};
