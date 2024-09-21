/* eslint-disable @next/next/no-img-element */
"use client";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { Calendar, ChevronRight, Eye, Pencil, Share2, Trash2 } from "lucide-react";
import { BookNowModal, CopyLink } from "../shared";
import { useState } from "react";
import Link from "next/link";
import { Routes } from "@/lib";

interface IProps {
  isForTrainer?: boolean;
}

export const FloatingComponent = ({ isForTrainer = false }: IProps) => {
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);

  function stopPropagation(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <>
      <BookNowModal isOpen={isBookNowModalOpen} setIsOpen={setIsBookNowModalOpen} />
      <Menubar className="bg-inherit p-0 h-fit border-0">
        <MenubarMenu>
          <MenubarTrigger className="p-0  border-0">
            <img src="/dots.svg" alt="Dots Icon" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link className="flex flex-row items-center text-sm gap-2 text-[#344054] w-full" href={`${Routes["class-details"]}/hello`}>
                <Eye size={16} color="#008080" />
                <span>View Details</span>
              </Link>
            </MenubarItem>
            {!isForTrainer && (
              <MenubarItem className="flex flex-row items-center text-sm gap-2 text-[#344054] w-full">
                <Pencil size={16} color="#008080" />
                <span>Edit</span>
              </MenubarItem>
            )}

            {isForTrainer && (
              <MenubarItem
                onClick={(e) => {
                  stopPropagation(e);
                  setIsBookNowModalOpen(true);
                }}
                className="flex flex-row items-center justify-between text-sm gap-2 text-[#344054] w-full"
              >
                <div className="flex-row flex items-center gap-2">
                  <Calendar size={16} color="#008080" />
                  <span>Book Now</span>
                </div>
                <ChevronRight size={16} />
              </MenubarItem>
            )}

            <MenubarSub>
              <MenubarSubTrigger className="flex flex-row items-center text-sm text-[#344054] justify-between w-full">
                <div className="flex flex-row items-center gap-2">
                  <Share2 size={16} color="#008080" />
                  <span>Share</span>
                </div>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="w-[364px] text-[#1C1939] flex flex-col items-start space-y-2 rounded-[8px]">
                  <CopyLink />
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {!isForTrainer && (
              <MenubarItem className="flex flex-row items-center text-sm text-[#344054] gap-2 w-full">
                <Trash2 size={16} color="#008080" />
                <span>Delete</span>
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
