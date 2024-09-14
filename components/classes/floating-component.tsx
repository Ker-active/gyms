"use client";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { Pencil, Share2, Trash2 } from "lucide-react";
import { CopyLink } from "../shared";

export const FloatingComponent = () => {
  return (
    <Menubar className="bg-inherit p-0 h-fit border-0">
      <MenubarMenu>
        <MenubarTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="p-0  border-0"
        >
          <img src="/dots.svg" alt="Dots Icon" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="flex flex-row items-center text-sm gap-2 text-[#344054] w-full">
            <Pencil size={16} color="#008080" />
            <span>Edit</span>
          </MenubarItem>
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
          <MenubarItem className="flex flex-row items-center text-sm text-[#344054] gap-2 w-full">
            <Trash2 size={16} color="#008080" />
            <span>Delete</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
