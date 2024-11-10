import { TProfile } from "@/app/dashboard/profile/page";
import { X } from "lucide-react";
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

  const medias = form.watch("media");
  const isMediaAllStrings = medias.every((item: any) => typeof item == "string");

  return (
    <article className="flex bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4">
      <header>
        <h3 className="text-[#1C1939]  font-medium font-inter">Media</h3>
      </header>
      <hr />
      {medias.length == 0 ? (
        <div className="grid  text-[13px] py-[100px] place-items-center">
          <Image alt="Media Icon" src={"/gallery.svg"} width={80} height={80} />
          <p>You do not have any pictures or videos yet. </p>
          <input multiple accept="image/*" onChange={handleChange} id="media" type="file" hidden />
          <button type="button" onClick={() => document.getElementById("media")?.click()} className="text-primary underline">
            Upload media
          </button>
        </div>
      ) : (
        <div className="grid p-1 relative pb-10  grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {isMediaAllStrings && (
            /**
             * If typeof item is a string, this means, we are pre-populating the images and the close button should be available  at only one time to close the images, because we cant upload a file and a string at the same time.
             */
            <button type="button" onClick={() => form.setValue("media", [])} className="absolute top-2 right-2 rounded-full bg-white p-2 z-10">
              <X />
            </button>
          )}
          {medias.map((media, index) => {
            const src = typeof media === "string" ? media : URL.createObjectURL(media);
            return (
              <div key={media} className="relative border h-[200px]  w-full rounded-[5px] overflow-hidden">
                {typeof media !== "string" && (
                  <button
                    type="button"
                    onClick={() => {
                      const newMedias = [...medias];
                      newMedias.splice(index, 1);
                      form.setValue("media", newMedias);
                    }}
                    className="absolute top-2 right-2 rounded-full bg-white p-2 z-10"
                  >
                    <X />
                  </button>
                )}

                <Image fill className="object-contain" src={src} alt="Media Icon" />
              </div>
            );
          })}
          {!isMediaAllStrings && (
            <button type="button" onClick={() => document.getElementById("media")?.click()} className="text-primary absolute left-[50%] translate-x-[-50%] bottom-1 underline">
              Upload more media
            </button>
          )}
        </div>
      )}
    </article>
  );
};
