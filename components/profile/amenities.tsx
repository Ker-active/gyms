import { useFormContext } from "react-hook-form";
import { Tag } from "./tag";
import { TProfile } from "@/app/dashboard/profile/page";
import { useState } from "react";
import { Input } from "../ui/input";

const AvailableAmenities = ["Changing area", "Bathroom", "Lockers", "Car park", "Towels", "mirrors"];

const AvailableSpecialNeeds = ["Wheelchair Accessibility", "Disability Friendly", "Pre-natal Friendly"];

export const Amenities = () => {
  const [specialNeeds, setSpecialNeeds] = useState(AvailableSpecialNeeds);
  const form = useFormContext<TProfile>();
  const [inputValue, setInputValue] = useState("");

  return (
    <article className="flex bg-white px-[20px] gap-[30px] py-[24px] rounded-[8px] flex-col ">
      <header>
        <h3 className="text-[#1C1939]  font-medium font-inter">Amenities</h3>
      </header>
      <hr />
      <ul className="flex flex-row flex-wrap gap-x-[15px] gap-y-[20px]">
        {AvailableAmenities.map((service) => (
          <li key={service}>
            <Tag<TProfile> name="amenities" value={service} />
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-[30px]">
        <h3 className="text-[#1C1939] font-inter">Special Needs</h3>
        <ul className="flex flex-row flex-wrap gap-x-[15px] gap-y-[20px]">
          {specialNeeds.map((service) => (
            <li key={service}>
              <Tag<TProfile> name="amenities" value={service} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <h3 className="text-[#1C1939] mb-4 font-inter">Not on the list? simply type into the box below</h3>

        <Input
          placeholder="Add new service"
          className={"text-sm border h-[37px] w-[200px]  rounded-full text-[#909090] py-[9px] px-[24.5px]"}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key == "Go") {
              e.preventDefault();
              setSpecialNeeds([...specialNeeds, e.currentTarget.value]);
              form.setValue("amenities", [...form.getValues("amenities"), e.currentTarget.value]);
              setInputValue("");
            }
          }}
          enterKeyHint="done"
        />
      </div>
    </article>
  );
};
