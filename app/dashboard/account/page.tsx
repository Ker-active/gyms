"use client";
import { ClassBookings, PersonalInformation, UpcomingClasses } from "@/components/account";

export default function Page() {
  return (
    <section className="flex min-h-full mb-[120px] sm:mb-0 flex-col font-inter gap-6 sm:gap-10">
      <h2 className="section-header">My Account</h2>
      <section className="flex rounded-[5px]  flex-col w-full gap-[50px]">
        <UpcomingClasses />
        <ClassBookings />
        <PersonalInformation />
      </section>
    </section>
  );
}

// const rightElementRef = useRef<HTMLDivElement>(null);
// const [rightElementHeight, setRightElementHeight] = useState(400);

// useEffect(() => {
//   if (rightElementRef.current) {
//     setRightElementHeight(rightElementRef.current.clientHeight);
//   }
// }, []);

//   <MyCalendar height={rightElementHeight} />
//         <div
//           // ref={rightElementRef}
//           className='flex rounded-[5px]   flex-col w-full gap-4'
//         >
//           <Subscription />
//           <PersonalInformation />
//         </div>
