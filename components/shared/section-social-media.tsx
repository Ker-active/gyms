import { cn } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {}
export const SectionSocialMedia = ({ className, ...rest }: IProps) => {
  return (
    <div
      className={cn("flex flex-row gap-6 items-center", className)}
      {...rest}
    >
      <div className='flex flex-row gap-1 items-center'>
        <Image
          width={25}
          height={25}
          src={"/instagram.svg"}
          alt='Instagram Icon'
        />
        <Link className='underline text-[#3385FF]' href='#'>
          @kerfitness
        </Link>
      </div>
      <div className='flex flex-row gap-1 items-center'>
        <Image width={25} height={25} src={"/twitter.svg"} alt='Twitter Icon' />
        <Link className='underline text-[#3385FF]' href='#'>
          @kerfitness
        </Link>
      </div>
    </div>
  );
};
