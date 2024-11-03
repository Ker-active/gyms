import { useFormContext } from "react-hook-form";
import { FormLabel } from "../ui/form";
import { X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";

interface IProps {
  label?: string;
}

export const FormMedia = ({ label }: IProps) => {
  const form = useFormContext();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    form.setValue("media", [...Array.from(files as any)]);
  }

  const medias = form.watch("media");

  const isMediaAllStrings = medias.every((item: any) => typeof item == "string");

  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <input multiple accept="image/*" onChange={handleChange} id="media" type="file" hidden />
      <div className="relative border border-dashed min-h-[300px]  w-full rounded-[5px] overflow-hidden">
        {form.watch("media")?.length > 0 ? (
          <div className="relative w-full min-h-[300px]">
            {isMediaAllStrings && (
              /**
               * If typeof item is a string, this means, we are pre-populating the images and the close button should be available  at only one time to close the images, because we cant upload a file and a string at the same time.
               */
              <button type="button" onClick={() => form.setValue("media", [])} className="absolute top-2 right-2 rounded-full bg-white p-2 z-10">
                <X />
              </button>
            )}
            <div className="grid p-1 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              {medias.map((item: any, index: number) => {
                const src = typeof item === "string" ? item : URL.createObjectURL(item);
                return (
                  <div key={index} className="relative border w-full min-h-[200px]">
                    {/* If typeof item is not a string, it means this was just uploaded, so have the close button for each of the images */}
                    {typeof item !== "string" && (
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
                    <Image className="object-contain" fill src={src} alt="Media Icon" />
                  </div>
                );
              })}
            </div>
            {!isMediaAllStrings && (
              <button type="button" onClick={() => document.getElementById("media")?.click()} className="text-primary absolute left-[50%] translate-x-[-50%] bottom-1 underline">
                Upload more media
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[13px] h-[300px]">
            <Image alt="Media Icon" src={"/gallery.svg"} width={80} height={80} />
            <p>You do not have any picture yet. </p>
            <button type="button" onClick={() => document.getElementById("media")?.click()} className="text-primary underline">
              Upload media
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
