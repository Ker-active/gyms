import { useFormContext } from "react-hook-form";
import { Tag } from "./tag";
import { useState } from "react";
import { Input } from "../ui/input";
import { TProfile } from "@/app/dashboard/profile/page";

const AvailableServices = [
  "Running Coach",
  "BasketBall Coach",
  "Swimming Coach",
  "Nutritionist",
  "Pilate Instructor",
  "Muay Thai Instructor",
  "Boxing Instructor",
  "Private Personal Training",
  "CrossFit",
  "Surfing Instructor",
  "Tennis",
  "Pilates Instructor",
];
export const Services = () => {
  const [services, setServices] = useState(AvailableServices);
  const form = useFormContext<TProfile>();
  const [inputValue, setInputValue] = useState("");

  return (
    <article className="flex bg-white px-[20px] gap-[30px] py-[24px] rounded-[8px] flex-col ">
      <header>
        <h3 className="text-[#1C1939] font-medium font-inter">Services</h3>
      </header>
      <hr />
      <ul className="flex flex-row flex-wrap gap-x-[15px] gap-y-[20px]">
        {services.map((service) => (
          <li key={service}>
            <Tag<TProfile> name="services" value={service} />
          </li>
        ))}
      </ul>
      <div className="flex flex-col">
        <h3 className="text-[#1C1939] mb-4 font-inter">Not on the list? simply type into the box below</h3>

        <Input
          placeholder="Add new service"
          className={"text-sm border h-[37px] w-[200px] rounded-full text-[#909090] py-[9px] px-[24.5px]"}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Go") {
              e.preventDefault();
              setServices([...services, e.currentTarget.value]);
              form.setValue("services", [...form.getValues("services"), e.currentTarget.value]);
              setInputValue("");
            }
          }}
          enterKeyHint="done"
        />
      </div>
    </article>
  );
};
