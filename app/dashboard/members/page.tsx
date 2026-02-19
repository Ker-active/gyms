"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMembers } from "@/hooks/members";
import { Empty, LoadingComponent } from "@/components/shared";

export default function Root() {
  const { data, isLoading } = useGetMembers();
  const invoices = data?.data ?? [];

  const handleDownload = () => {
    if (!invoices.length) return;

    const headers = ["Full Name", "Email Address", "Total Bookings", "Attended Count"];
    const rows = invoices.map((member) => [member.fullname, member.email, member.totalBookings, member.attendedCount]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "members.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-white font-inter">
      <header className="flex flex-row items-center w-full justify-between px-[20px] py-6">
        <h2 className="section-header">All Members</h2>
        <Button size="sm" className="w-fit px-4 rounded-[8px]" onClick={handleDownload} disabled={!invoices.length}>
          Download
        </Button>
      </header>
      <Table>
        <TableHeader className="bg-[#F6F6F6]">
          <TableRow>
            <TableHead className="text-center">Full Name</TableHead>
            <TableHead className="text-center">Email Address</TableHead>
            <TableHead className="text-center">Total Bookings</TableHead>
            <TableHead className="text-center">Attended Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="py-10">
                <div className="flex justify-center">
                  <LoadingComponent />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            display(invoices.length, invoices)
          )}
        </TableBody>
      </Table>
    </section>
  );
}

function display(dataLength: number, invoices: any[]) {
  if (dataLength === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="py-20">
          <div className="flex justify-center items-center w-full">
            <Empty desc="No registered members" src="/members.svg" alt="Members Icon" />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return invoices.map((invoice, index) => (
    <TableRow className="text-[#686868]" key={index}>
      <TableCell className="text-center">{invoice.fullname}</TableCell>
      <TableCell className="underline text-center text-[#1D71D4]">{invoice.email}</TableCell>
      <TableCell className="text-center">{invoice.totalBookings}</TableCell>
      <TableCell className="text-center">{invoice.attendedCount}</TableCell>
    </TableRow>
  ));
}

// const invoices = [
//   {
//     date: "02-02-2022",
//     fullName: "John Doe",
//     email: "johndoe@gmail.com",
//     subscriptionType: "Monthly",
//     expiry: "29 days",
//   },
//   {
//     date: "02-02-2022",
//     fullName: "John Doe",
//     email: "johndoe@gmail.com",
//     subscriptionType: "Monthly",
//     expiry: "29 days",
//   },
//   {
//     date: "02-02-2022",
//     fullName: "John Doe",
//     email: "johndoe@gmail.com",
//     subscriptionType: "Monthly",
//     expiry: "29 days",
//   },
// ];

// const invoices = [
//   {
//     totalBookings: 1,
//     attendedCount: 0,
//     userId: "67e025e4b0c526d0664abecb",
//     fullname: "Abiodun Emmanuel",
//     email: "abiodunnoyekunle@gmail.com",
//   },
//   {
//     totalBookings: 1,
//     attendedCount: 1,
//     userId: "681101b2d71dc3477cc2609d",
//     fullname: "yhunghabey",
//     email: "yhung.habey1994@gmail.com",
//   },
// ];
