import { TUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, getInitials } from "@/lib";

export const AvatarName = ({ data, useInNavbar = false }: { data: TUser; useInNavbar?: boolean }) => {
  return (
    <div className="flex gap-[11px] ml-4 flex-row items-center">
      <Avatar className="w-10 h-10">
        <AvatarImage src={data?.media[0] || ""} alt={`${data?.fullname} Image`} />
        <AvatarFallback>{getInitials(data.fullname)}</AvatarFallback>
      </Avatar>
      <p className={cn("text-[#1C1939]", useInNavbar && "hidden sm:flex")}>{data?.fullname || "Loading..."}</p>
    </div>
  );
};
