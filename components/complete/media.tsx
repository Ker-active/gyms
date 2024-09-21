import { TProfile } from "@/app/dashboard/complete/page";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export const Media = () => {
  const form = useFormContext<TProfile>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length < 2) return toast.error("Please select two or more files");

    form.setValue("media", [...Array.from(files as any)]);
  }

  return (
    <article className="flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4">
      <header>
        <h3 className="text-[#1C1939]  font-medium font-inter">Media</h3>
      </header>
      <hr />
      {form.watch("media").length == 0 ? (
        <div className="grid  text-[13px] py-[100px] place-items-center">
          <Image alt="Media Icon" src={"/gallery.svg"} width={80} height={80} />
          <p>You do not have any pictures or videos yet. </p>
          <input multiple accept="image/*" onChange={handleChange} id="media" type="file" hidden />
          <button type="button" onClick={() => document.getElementById("media")?.click()} className="text-primary underline">
            Upload media
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[11px] sm:grid-cols-2">
          {form.watch("media").map((media) => (
            <div key={media} className="relative h-[200px]  w-full rounded-[5px] overflow-hidden">
              <Image fill src={URL.createObjectURL(media)} alt="Media Icon" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
