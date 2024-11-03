export const UpcomingClasses = () => {
  return (
    <article className="space-y-4  px-[20px] py-[15px] bg-white">
      <h3 className="text-[#1C1939] text-lg font-semibold  font-inter">Upcoming Classes</h3>
      <hr />
      <div className="flex gap-1 w-full overflow-x-auto flex-col">
        {Array.from({ length: 2 }).map((_, i) => (
          <div className="bg-[#F8F7FA] py-[20px] flex flex-row items-center justify-between gap-4 px-4  text-sm [60px] rounded-[8px]" key={i}>
            <p className="text-[#686868]">Wednesday, 02-01-2022</p>
            <p className="text-[#686868]">7am-8am</p>
            <p className="text-[#686868]">Yoga</p>
            <p className="underline text-[#377DFF]">Ker-Fitness</p>
          </div>
        ))}
      </div>
    </article>
  );
};
