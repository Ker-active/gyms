import { z } from "zod";

const timeValidation = (data: any) => {
  // If either time is missing, let the required validation handle it
  if (!data.timeFrom || !data.timeTo) return true;

  // Convert time strings to Date objects for comparison
  const timeFrom = new Date(`1970-01-01T${data.timeFrom}`);
  const timeTo = new Date(`1970-01-01T${data.timeTo}`);

  // Calculate difference in minutes
  const diffInMinutes = (timeTo.getTime() - timeFrom.getTime()) / (1000 * 60);

  // Check if timeFrom is before timeTo and difference is at least 10 minutes
  return timeFrom < timeTo && diffInMinutes >= 10;
};

// Create the base schema first
const BaseSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  type: z.string().min(1, { message: "Required" }),
  trainer: z.string().min(1, { message: "Required" }),
  availableSlot: z.string().min(1, { message: "Required" }),
  location: z.string().min(1, { message: "Required" }).optional(),
  room: z.string().min(1, { message: "Required" }).optional(),
  date: z.string().min(1, { message: "Required" }),
  timeFrom: z.string().min(1, { message: "Required" }),
  timeTo: z.string().min(1, { message: "Required" }),
  price: z.string().optional(),
  onlineLink: z.string().optional(),
  free: z.boolean(),
  description: z.string().min(1, { message: "Required" }),
  media: z.any(),
});

// Create base versions of both schemas
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

// Add the price validation refinement
const priceValidation = (data: any) => {
  if (!data.free && !data.price) {
    return false;
  }
  return true;
};

// Create the final schemas with validation
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
