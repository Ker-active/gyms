import { useFormContext } from "react-hook-form";
import { Tag } from "./tag";
import { TProfile } from "@/app/dashboard/profile/page";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetAmenitiesList, useGetSpecialNeedsList } from "@/hooks/useProfileOptionsList";

const AvailableAmenities = ["Changing area", "Bathroom", "Lockers", "Car park", "Towels", "mirrors"];

const AvailableSpecialNeeds = ["Wheelchair Accessibility", "Disability Friendly", "Pre-natal Friendly"];

export const Amenities = () => {
  const { data: amenitiesData, isLoading: loadingAmenities, isError: errorAmenities } = useGetAmenitiesList();
  const { data: specialNeedsData, isLoading: loadingSpecialNeeds, isError: errorSpecialNeeds } = useGetSpecialNeedsList();

  const form = useFormContext<TProfile>();

  const [amenities, setAmenities] = useState<string[]>(AvailableAmenities);
  const [specialNeeds, setSpecialNeeds] = useState<string[]>(AvailableSpecialNeeds);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (amenitiesData?.data) {
      setAmenities(amenitiesData.data.map((item) => item.ServiceName /* or .AmenityName */));
    }
  }, [amenitiesData]);

  useEffect(() => {
    if (specialNeedsData?.data) {
      setSpecialNeeds(specialNeedsData.data.map((item) => item.ServiceName));
    }
  }, [specialNeedsData]);

  if (loadingAmenities || loadingSpecialNeeds) return <p>Loading options…</p>;
  if (errorAmenities || errorSpecialNeeds) return <p>Failed to load profile options.</p>;

  return (
    <article className="flex bg-white px-[20px] gap-[30px] py-[24px] rounded-[8px] flex-col ">
      <header className="flex flex-row items-center gap-1">
        <h3 className="text-[#1C1939]  font-medium font-inter">Amenities</h3>
        <span className="text-red-500">*</span>
      </header>
      <hr />
      <ul className="flex flex-row flex-wrap gap-x-[15px] gap-y-[20px]">
        {amenities.map((service) => (
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

        <div className="flex-row flex  gap-2 items-center">
          <Input
            placeholder="Add new amenities"
            className={"text-sm border h-[37px] w-[200px]  rounded-full text-[#909090] py-[9px] px-[24.5px]"}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Go") {
                e.preventDefault();
                setSpecialNeeds([...specialNeeds, e.currentTarget.value]);
                form.setValue("amenities", [...form.getValues("amenities"), e.currentTarget.value]);
                setInputValue("");
              }
            }}
            enterKeyHint="done"
          />
          <Button
            type="button"
            size="sm"
            className="w-fit "
            onClick={() => {
              setSpecialNeeds([...specialNeeds, inputValue]);
              form.setValue("amenities", [...form.getValues("amenities"), inputValue]);
              setInputValue("");
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </article>
  );
};
