import { calculateTime, cn, formatDate, isSameUser } from "@/lib";
import { ScrollArea } from "../ui/scroll-area";
import { isSameDay } from "date-fns";

const messages = [
  {
    id: 1,
    message: "Hello world",
    senderId: "203",
    date: new Date(),
  },
  {
    id: 2,
    message: "How are you",
    senderId: "203",
    date: new Date(),
  },
  {
    id: 3,
    message: "I'm good o",
    senderId: "204",
    date: new Date(),
  },
];

const loginUserId = "203";

export const ChatList = () => {
  return (
    <ScrollArea className='h-[calc(100%-80px)] flex flex-col px-0  w-full rounded-md'>
      {messages.map((message, index) => {
        const showDate =
          index === 0 ||
          !isSameDay(
            new Date(message.date),
            index > 0 ? new Date(messages[index - 1].date) : new Date()
          );

        return (
          <>
            {showDate && (
              <div className='flex justify-center'>
                <p className={cn("bg-[#F4F2F2] px-3 py-1 rounded-[12px]")}>
                  {formatDate(new Date(message.date))}
                </p>
              </div>
            )}
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] w-fit flex flex-col rounded-[12px] py-1 px-3",
                message.senderId == loginUserId
                  ? "bg-brand text-white ml-auto"
                  : "bg-[#F4F2F2] text-[#011627]",
                isSameUser(messages, message, index) ? "mt-[2px]" : "mt-1"
              )}
            >
              <p>{message.message}</p>
              <p className='text-[12px] text-right'>
                {calculateTime(message.date.toString())}
              </p>
            </div>
          </>
        );
      })}
    </ScrollArea>
  );
};
