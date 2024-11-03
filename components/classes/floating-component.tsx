/* eslint-disable @next/next/no-img-element */
"use client";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { Calendar, ChevronRight, Eye, Pencil, Share2, Trash2 } from "lucide-react";
import { BookNowModal, CopyLink } from "../shared";
import { useState } from "react";
import Link from "next/link";
import { CacheKeys, Routes } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/api";

interface IProps {
  isForTrainer?: boolean;
  onlineLink?: string;
  _id?: string;
}

export const FloatingComponent = ({ isForTrainer = false, onlineLink = "online link", _id = "giberrish" }: IProps) => {
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const queryClient = useQueryClient();

  function stopPropagation(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  const { mutate } = useMutation({
    mutationFn: () => client.delete(`/class/delete/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.CLASSES] });
      toast.success("Class deleted successfully");
    },
  });

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
              <Link className="flex flex-row items-center text-sm gap-2 text-[#344054] w-full" href={`${Routes["class-details"]}/${_id}`}>
                <Eye size={16} color="#008080" />
                <span>View Details</span>
              </Link>
            </MenubarItem>
            {!isForTrainer && (
              <MenubarItem asChild>
                <Link className="flex flex-row items-center text-sm gap-2 text-[#344054] w-full" href={`${Routes["add-class"]}?classId=${_id}`}>
                  <Pencil size={16} color="#008080" />
                  <span>Edit</span>
                </Link>
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
                  <CopyLink link={onlineLink} />
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {!isForTrainer && (
              <MenubarItem asChild>
                <button
                  onClick={() => {
                    mutate();
                    toast.success("Deleting...");
                  }}
                  className="flex flex-row items-center text-sm text-[#344054] gap-2 w-full"
                >
                  <Trash2 size={16} color="#008080" />
                  <span>Delete</span>
                </button>
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
