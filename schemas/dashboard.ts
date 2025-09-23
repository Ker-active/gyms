import { z } from "zod";

const timeValidation = (data: any) => {

  if (!data.timeFrom || !data.timeTo) return true;

  let timeFromHour = parseInt(data.timeFrom.split(':')[0]);
  let timeFromMin = parseInt(data.timeFrom.split(':')[1]);
  let timeToHour = parseInt(data.timeTo.split(':')[0]);
  let timeToMin = parseInt(data.timeTo.split(':')[1]);
  

  if (data.timeFrom.includes('AM') && timeFromHour === 12) timeFromHour = 0;
  if (data.timeTo.includes('AM') && timeToHour === 12) timeToHour = 0;
  if (data.timeFrom.includes('PM') && timeFromHour !== 12) timeFromHour += 12;
  if (data.timeTo.includes('PM') && timeToHour !== 12) timeToHour += 12;
  

  const timeFrom = new Date(1970, 0, 1, timeFromHour, timeFromMin);
  const timeTo = new Date(1970, 0, 1, timeToHour, timeToMin);

  const diffInMinutes = (timeTo.getTime() - timeFrom.getTime()) / (1000 * 60);

  return timeFrom < timeTo && diffInMinutes >= 10;
};

const BaseSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  type: z.string().min(1, { message: "Required" }),
  trainer: z.string().min(1, { message: "Required" }),
  availableSlot: z.string().min(1, { message: "Required" }),
  location: z.string().optional(),
  room: z.string().optional(),
  date: z.string().min(1, { message: "Required" }),
  timeFrom: z.string().min(1, { message: "Required" }),
  timeTo: z.string().min(1, { message: "Required" }),
  price: z.string().optional(),
  onlineLink: z.string().optional(),
  free: z.boolean(),
  description: z.string().min(1, { message: "Required" }),
  media: z.any(),
});

const BaseClassSchema = BaseSchema;
const BaseEventSchema = BaseSchema.pick({
  title: true,
  availableSlot: true,
  location: true,
  room: true,
  date: true,
  timeFrom: true,
  timeTo: true,
  price: true,
  free: true,
  onlineLink: true,
  media: true,
});

const priceValidation = (data: any) => {
  if (!data.free && !data.price) {
    return false;
  }
  return true;
};

export const AddClassSchema = BaseClassSchema.refine(priceValidation, {
  message: "Price is required",
  path: ["price"],
}).refine(timeValidation, {
  message: "End time must be at least 10 minutes after start time",
  path: ["timeTo"],
});

export const AddEventSchema = BaseEventSchema.refine(priceValidation, {
  message: "Price is required",
  path: ["price"],
}).refine(timeValidation, {
  message: "End time must be at least 10 minutes after start time",
  path: ["timeTo"],
});

export type TClassSchema = z.infer<typeof AddClassSchema>;
export type TEventSchema = z.infer<typeof AddEventSchema>;
