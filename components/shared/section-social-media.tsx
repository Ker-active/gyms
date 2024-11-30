import { cn } from "@/lib";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { BsGlobe, BsTelephone, BsTwitterX } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const iconMap = {
  twitter: BsTwitterX,
  instagram: FaInstagram,
  email: MdOutlineMail,
  phone: BsTelephone,
  website: BsGlobe,
};

interface IProps extends HTMLAttributes<HTMLDivElement> {
  data: Record<string, string>;
}
export const SectionSocialMedia = ({ data, className, ...rest }: IProps) => {
  return (
    <div className={cn("flex flex-wrap flex-row gap-6 items-center", className)} {...rest}>
      {Object.entries(data).map(([key, value], index) => {
        const Icon = iconMap[key as keyof typeof iconMap];
        return (
          <Link key={index} href={value} target="_blank" rel="noreferrer" className="flex flex-row text-[#008080] underline gap-1 items-center">
            <Icon />
            <p className="text-base">{value}</p>
          </Link>
        );
      })}
    </div>
  );
};
