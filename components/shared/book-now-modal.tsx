import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const BookNowModal = ({ isOpen, setIsOpen }: IProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90vw] sm:min-w-[850px] overflow-y-auto max-h-[80dvh]  flex flex-col sm:flex-row gap-4 sm:gap-[30px]">
        <div className="min-w-[300px] relative min-h-[350px]">
          <Image fill alt="Trainers' Image" src={"/images/trainer.png"} />
        </div>
        <article className="w-full gap-2 grid">
          <p className="text-[#1C1939] font-bold tracking-[0.5px] text-2xl">Core Cardio by Kerfitness</p>
          <h3 className="text-[#008080]  font-semibold font-inter">Thursday, September 5th, 6:30pm - 7:30pm</h3>
          <p>18 Modupe street, lekki Phrase1</p>
          <div className="flex flex-row items-center gap-3">
            <Button size="sm">Book Now</Button>
            <p className="text-sm flex flex-row items-center gap-1 text-[#737373]">20 slots available</p>
          </div>
          <section className="space-y-2 mt-[28px] text-[#1C1939]  ">
            <h3 className="font-semibold">Description</h3>
            <p className="text-[#737373] leading-[30px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, doloribus amet? Sint perspiciatis cum sit adipisci porro quasi rerum, repudiandae modi doloremque facere aliquam possimus
              odit aliquid voluptatibus optio, et dolore ex quibusdam illum itaque totam nemo a maxime dolor? Dicta fugit odit eligendi reprehenderit eius quae neque sequi quas.
            </p>
          </section>
        </article>
      </DialogContent>
    </Dialog>
  );
};
