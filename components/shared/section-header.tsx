"use client";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib";

interface IProps extends ButtonProps {
  title: string;
  hasRightElement?: boolean;
  rightElementNode?: React.ReactNode;
  rightElementText: string;
  containerClass?: string;
}

export const SectionHeader = ({ title, containerClass, rightElementText, hasRightElement = true, rightElementNode, ...rest }: IProps) => {
  const router = useRouter();
  return (
    <header className={cn("flex flex-col gap-4 sm:flex-row items-start justify-between", containerClass)}>
      <div className="flex flex-row items-center gap-2">
        <Button variant="ghost" className="border-[1.2px] rounded-[8px] border-[#BFBFBF]" onClick={() => router.back()} size="icon">
          <ArrowLeft color="#737373" />
        </Button>
        <h2 className="section-header">{title}</h2>
      </div>

      {hasRightElement && (
        <>
          {rightElementNode ? (
            rightElementNode
          ) : (
            <Button size="sm" {...rest}>
              {rightElementText}
            </Button>
          )}
        </>
      )}
    </header>
  );
};
