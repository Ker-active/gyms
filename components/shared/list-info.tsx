export const ListInfo = ({
  item,
  title,
}: {
  item: string[];
  title: string;
}) => {
  return (
    <article className='space-y-[10px] text-[#1C1C1C]'>
      <h2 className='text-lg font-bold'>{title}</h2>
      <ul className='flex flex-row text-[#737373] gap-x-[30px] flex-wrap'>
        {item.map((item) => (
          <li className='flex flex-row items-center gap-2' key={item}>
            <div className='w-[5px] h-[5px] rounded-full bg-[#737373]' />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};
