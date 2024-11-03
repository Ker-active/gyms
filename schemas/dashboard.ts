import { z } from "zod";

export const AddClassSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  type: z.string().min(1, { message: "Required" }),
  trainer: z.string().min(1, { message: "Required" }),
  availableSlot: z.string().min(1, { message: "Required" }),
  location: z.string().min(1, { message: "Required" }),
  room: z.string().min(1, { message: "Required" }),
  date: z.string().min(1, { message: "Required" }),
  timeFrom: z.string().min(1, { message: "Required" }),
  timeTo: z.string().min(1, { message: "Required" }),
  price: z.string().min(1, { message: "Required" }),
  onlineLink: z.string().optional(),
  free: z.boolean(),
  description: z.string().min(1, { message: "Required" }),
  media: z.any(),
});

export type TClassSchema = z.infer<typeof AddClassSchema>;

export const AddEventSchema = AddClassSchema.pick({
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

export type TEventSchema = z.infer<typeof AddEventSchema>;
