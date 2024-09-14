import { ClassInfo } from "@/components/classes/class-info";
import { DateChange } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const invoices = [
  {
    date: "02-02-2022",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Monthly",
    expiry: "29 days",
  },
  {
    date: "02-02-2022",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Monthly",
    expiry: "29 days",
  },
  {
    date: "02-02-2022",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Monthly",
    expiry: "29 days",
  },
];

export default function Root() {
  return (
    <section className="w-full h-full space-y-6 font-inter">
      <section className="space-y-[21px]">
        <h2 className="font-medium text-base">Today</h2>
        <ClassInfo className="bg-white py-[20px] px-[13px]" />
      </section>
      <section className="grid grid-cols gap-[20px] md:grid-cols-2">
        <article className="bg-white px-[20px] py-[33px]">
          <h3 className="font-medium text-base">Tomorrow</h3>
          <ClassInfo className="py-[20px]" />
        </article>
        <article className="bg-white space-y-[21px] g px-[20px] py-[33px]">
          <header className="flex flex-row items-center justify-between">
            <h3 className="font-medium text-base">This week</h3>
            <DateChange />
          </header>
          <ul className="space-y-[13px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className="h-[90px] bg-[#F5F5F5] text-[#1C1939] flex flex-col justify-between py-4 px-6 border-b border-[#E6E6E6]">
                <p className="text-[12px]">Classes</p>
                <p className="text-[22px] font-semibold">0</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
