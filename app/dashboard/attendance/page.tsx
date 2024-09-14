import { ScanBarCode } from "@/components/attendance/scan-attedance";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    date: "02-02-2022",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Quarterly",
    scanTime: "1:30pm",
  },
  {
    date: "02-02-2022",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Monthly",
    scanTime: "1:30pm",
  },
  {
    date: "02-02-2022",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    subscriptionType: "Yearly",
    scanTime: "1:30pm",
  },
];

export default function Attendance() {
  return (
    <section className='w-full bg-white font-inter'>
      <header className='flex flex-row items-center w-full justify-between px-[20px] py-6'>
        <h2 className='section-header'>Attendance</h2>
        <ScanBarCode />
      </header>
      <Table>
        <TableHeader className='bg-[#F6F6F6]'>
          <TableRow>
            <TableHead className='w-[100px] text-center'>Date</TableHead>
            <TableHead className='text-center'>Full Name</TableHead>
            <TableHead className='text-center'>Email Address</TableHead>
            <TableHead className='text-center'>Subscription Type</TableHead>
            <TableHead className='text-center'>Scan Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow className='text-[#686868]' key={index}>
              <TableCell className='min-w-[120px] text-center'>
                {invoice.date}
              </TableCell>
              <TableCell className='text-center'>{invoice.fullName}</TableCell>
              <TableCell className='underline text-center text-[#1D71D4]'>
                {invoice.email}
              </TableCell>
              <TableCell className='text-center'>
                {invoice.subscriptionType}
              </TableCell>
              <TableCell className='text-center'> {invoice.scanTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
