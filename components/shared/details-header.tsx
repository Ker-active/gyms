"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Bookmark, MessageCircleMore, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Routes, cn } from "@/lib";

interface IProps {
  /**
   * This might be the id of a gym or a trainer
   */
  id: string;
}
export const GymsTrainersDetailsHeader = ({ id }: IProps) => {
  const pathname = usePathname();
  const isComponentUsedInGym = pathname.includes("gyms");

  return (
    <div className='flex flex-row gap-[11px] items-center'>
      <Button className='font-normal' size='sm'>
        View Plans
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
              variant='ghost'
              size='icon'
              className='bg-white min-w-[45px]  rounded-[10px] place-self-end'
            >
              <Bookmark size={24} color='#008080' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bookmark</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
              variant='ghost'
              size='icon'
              className='bg-white min-w-[45px] rounded-[10px] place-self-end'
            >
              <Share2 size={24} color='#008080' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`${
                isComponentUsedInGym ? Routes.gyms : Routes.trainers
              }/${id}/chat`}
              style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "bg-white min-w-[45px] rounded-[10px] place-self-end"
              )}
            >
              <MessageCircleMore size={24} color='#008080' />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
