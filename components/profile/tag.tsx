import { TProfile } from "@/app/dashboard/profile/page";
import { cn } from "@/lib";
import { useFormContext } from "react-hook-form";

interface IProps<T> {
  value: string;
  name: keyof T;
}
export const Tag = <T,>({ value, name }: IProps<T>) => {
  const { watch, setValue, getValues } = useFormContext<TProfile>();
  return (
    <button
      type="button"
      onClick={() => {
        const services = getValues(name as any);

        if (services.includes(value)) {
          setValue(
            name as any,
            services.filter((service: string) => service !== value)
          );
        } else {
          setValue(name as any, [...services, value]);
        }
      }}
      className={cn("text-sm border hover:bg-slate-100 rounded-full text-[#909090] py-[9px] px-[24.5px]", watch(name as any).includes(value) && "bg-primary text-white hover:bg-primary/90")}
    >
      {value}
    </button>
  );
};
