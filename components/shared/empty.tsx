import { Routes } from "@/lib";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

interface IProps extends ImageProps {
  href?: Routes;
  linkText: string;
  desc: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const Empty = ({ href, onClick, desc, linkText, ...rest }: IProps) => {
  return (
    <div className="flex flex-grow items-center gap-4 py-4 justify-center flex-col">
      <Image width={100} height={100} {...rest} />
      <p className="text-[13px] max-w-[415px] mx-auto text-center leading-[20px] text-[#5B5971]">
        {desc}
        {onClick ? (
          <button onClick={onClick} className="text-primary underline">
            {linkText}
          </button>
        ) : (
          <Link className="text-primary underline" href={href!}>
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
};
