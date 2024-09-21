"use client";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";
import { LinkProps } from "next/link";

interface IProps extends ButtonProps {
  title: string;
  hasRightElement?: boolean;
  rightElementNode?: React.ReactNode;
  rightElementText: string;
}

export const SectionHeader = ({ title, rightElementText, hasRightElement = true, rightElementNode, ...rest }: IProps) => {
  const router = useRouter();
  return (
    <header className="flex flex-col gap-4 sm:flex-row items-start justify-between">
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
