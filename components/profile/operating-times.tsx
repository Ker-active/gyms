import { useFormContext, useWatch } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const DAYS = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const DayTimeRow = ({ day, control }: { day: { id: string; label: string }; control: any }) => {
  const fromValue = useWatch({ control, name: `operatingTimes.${day.id}.from` });
  const toValue = useWatch({ control, name: `operatingTimes.${day.id}.to` });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] items-center gap-4">
      <span className="text-sm text-[#4F4F4F] font-medium">{day.label}</span>

      <FormField
        control={control}
        name={`operatingTimes.${day.id}.from`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="time"
                className="w-full text-gray-700 bg-white placeholder:text-gray-400"
                {...field}
                value={field.value || ""}
                max={toValue || undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`operatingTimes.${day.id}.to`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="time"
                className="w-full text-gray-700 bg-white placeholder:text-gray-400"
                {...field}
                value={field.value || ""}
                min={fromValue || undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const OperatingTimes = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-[8px] p-6 shadow-sm">
      <h3 className="text-[16px] font-semibold mb-6 text-gray-900 border-b border-[#E6E6E6] pb-4">Operating Times</h3>

      <div className="flex flex-col gap-4">
        {DAYS.map((day) => (
          <DayTimeRow key={day.id} day={day} control={control} />
        ))}
      </div>
    </div>
  );
};
