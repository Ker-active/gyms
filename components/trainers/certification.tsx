import Image from "next/image";
import { useFormContext } from "react-hook-form";

export const Certification = () => {
  const form = useFormContext();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      form.setValue("certification", e.target.files[0]);
    }
  }

  return (
    <article className="flex h-full bg-white px-[20px] py-[15px] rounded-[8px] flex-col gap-4">
      <header>
        <h3 className="text-[#1C1939] font-medium font-inter">Certification</h3>
      </header>
      <hr />
      <div className="flex items-center py-4 justify-center flex-col h-full">
        <Image width={80} height={80} alt="Certificate Svg" src="/certificate.svg" />
        <p className="text-[13px] text-center leading-[20px] text-[#5B5971]">
          You do not have any certification yet,{" "}
          <button onClick={() => document.getElementById("certification")?.click()} type="button" className="text-primary underline">
            Upload certificate
          </button>
        </p>
      </div>
      <input onChange={handleImageChange} hidden accept="image/*" type="file" id="certification" />
    </article>
  );
};
