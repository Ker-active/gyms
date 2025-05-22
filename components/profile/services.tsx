import { useFormContext } from "react-hook-form";
import { Tag } from "./tag";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TProfile } from "@/app/dashboard/profile/page";
import { Button } from "../ui/button";
import { useGetServicesList } from "@/hooks/useProfileOptionsList";

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
  const { data, isLoading, isError } = useGetServicesList();
  const form = useFormContext<TProfile>();

  const [services, setServices] = useState<string[]>(AvailableServices);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (data?.data) {
      setServices(data.data.map((svc) => svc.ServiceName));
    }
  }, [data]);

  if (isLoading) return <p>Loading services…</p>;
  if (isError) return <p>Couldn’t load services.</p>;

  return (
    <article className="flex bg-white px-[20px] gap-[30px] py-[24px] rounded-[8px] flex-col ">
      <header className="flex flex-row items-center gap-1">
        <h3 className="text-[#1C1939] font-medium font-inter">Services</h3> <span className="text-red-500">*</span>
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
        <div className="flex-row flex  gap-2 items-center">
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
          <Button
            type="button"
            size="sm"
            className="w-fit "
            onClick={() => {
              setServices([...services, inputValue]);
              form.setValue("services", [...form.getValues("services"), inputValue]);
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
