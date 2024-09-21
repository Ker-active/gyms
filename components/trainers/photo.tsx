"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";

export const Photo = () => {
  const form = useFormContext();
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      form.setValue("photo", e.target.files[0]);
    }
  }

  return (
    <div className="flex bg-white w-full items-center py-[28px] flex-col gap-2">
      <div className="relative w-[150px] overflow-hidden  rounded-full h-[150px]">
        <Image
          className="object-contain"
          alt="Avatar"
          src={form.watch("photo") ? (Boolean(form.watch("photo")?.image_url) ? form.watch("photo").image_url : URL.createObjectURL(form.watch("photo"))) : "/user.svg"}
          fill
        />
      </div>
      <div className="flex gap-2 flex-row items-center">
        <Button onClick={() => document.getElementById("avatar-input")?.click()} type="button" variant="outline" size="sm" className="space-x-1 rounded-md font-medium">
          <span>Upload Profile Picture</span>
        </Button>
      </div>
      <input onChange={handleImageChange} hidden accept="image/*" type="file" id="avatar-input" />
    </div>
  );
};
