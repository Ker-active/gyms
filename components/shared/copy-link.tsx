"use client";
import { BsCopy } from "react-icons/bs";
import { Button } from "../ui/button";
import { useClipboard } from "@/hooks";

export const CopyLink: React.FC<{ link: string }> = ({ link }) => {
  const { copyToClipboard } = useClipboard(link);
  return (
    <>
      <p className="text-[12px]">Copy Link</p>
      <div className="border w-full rounded-[5px] flex justify-between px-3 flex-row  items-center border-[#DEDEDE]">
        <p className="text-sm text-[#97969D]">https://www.ker.com</p>
        <Button onClick={copyToClipboard} variant="ghost" size="icon">
          <BsCopy size={20} color="#97969D" />
        </Button>
      </div>
    </>
  );
};
