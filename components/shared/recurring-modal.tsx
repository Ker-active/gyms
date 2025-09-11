"use client";

import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useMemo, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formTimeFrom?: string;
  formTimeTo?: string;
}

// Generate 4 time options in 15-minute intervals from a base time
const generateTimeOptionsFromBase = (baseTime: string): string[] => {
  if (!baseTime) return [];
  
  const [hour, minute] = baseTime.split(':').map(Number);
  const baseMinutes = hour * 60 + minute;
  const options = [];
  
  for (let i = 0; i < 4; i++) {
    const totalMinutes = baseMinutes + (i * 15);
    const newHour = Math.floor(totalMinutes / 60);
    const newMinute = totalMinutes % 60;
    
    if (newHour < 24) { // Don't go past midnight
      const timeString = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
      options.push(timeString);
    }
  }
  
  return options;
};

// Calculate duration between two times in minutes
const calculateDuration = (startTime: string, endTime: string): number => {
  if (!startTime || !endTime) return 0;
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  
  return endTotalMinutes - startTotalMinutes;
};

// Add minutes to a time string
const addMinutesToTime = (timeString: string, minutesToAdd: number): string => {
  if (!timeString) return "";
  
  const [hour, minute] = timeString.split(':').map(Number);
  const totalMinutes = hour * 60 + minute + minutesToAdd;
  const newHour = Math.floor(totalMinutes / 60) % 24; // Wrap around to next day
  const newMinute = totalMinutes % 60;
  
  return `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
};

// Format duration for display
const formatDuration = (minutes: number): string => {
  if (minutes === 0) return "";
  if (minutes < 60) return `${minutes} minutes`;
  if (minutes === 60) return "1 hour";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hours`;
  return `${hours}h ${remainingMinutes}m`;
};

export const RecurringModal = ({ isOpen, setIsOpen, formTimeFrom, formTimeTo }: IProps) => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [durationBase, setDurationBase] = useState<number>(30);
  const [recurrencePattern, setRecurrencePattern] = useState<"daily" | "weekly" | "monthly" | "">("");
  const [dailyEveryEnabled, setDailyEveryEnabled] = useState<boolean>(true);
  const [dailyInterval, setDailyInterval] = useState<number>(1);
  const [dailyWeekdayEnabled, setDailyWeekdayEnabled] = useState<boolean>(false);
  const dailyPanelRef = useRef<HTMLDivElement | null>(null);
  const [rangeStart, setRangeStart] = useState<string>("");
  const [rangeEnd, setRangeEnd] = useState<string>("");

  // Weekly state
  const [weeklyInterval, setWeeklyInterval] = useState<number>(1);
  const [weeklyDays, setWeeklyDays] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: false,
    Wednesday: true,
    Thursday: false,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });

  const toggleWeeklyDay = (day: string) => {
    setWeeklyDays((prev) => ({ ...prev, [day]: !prev[day as keyof typeof prev] }));
  };

  // Monthly state
  const [monthlyInterval, setMonthlyInterval] = useState<number>(1);
  const [monthlyMode, setMonthlyMode] = useState<"day" | "weekday">("weekday");
  const [monthlyDay, setMonthlyDay] = useState<number>(1);
  const [monthlyWeekOrdinal, setMonthlyWeekOrdinal] = useState<string>("First");
  const [monthlyWeekday, setMonthlyWeekday] = useState<string>("Monday");

  // Initialize with form values when modal opens
  useEffect(() => {
    if (isOpen && formTimeFrom && formTimeTo) {
      setStartTime(formTimeFrom);
      setEndTime(formTimeTo);
      // Immediately calculate and set duration when modal opens
      const calculatedDuration = calculateDuration(formTimeFrom, formTimeTo);
      if (calculatedDuration > 0) {
        setDuration(calculatedDuration.toString());
      }
    }
  }, [isOpen, formTimeFrom, formTimeTo]);

  // Generate time options based on form values and ensure current selections remain selectable
  const startTimeOptions = useMemo(() => {
    const base = generateTimeOptionsFromBase(formTimeFrom || "");
    if (startTime && !base.includes(startTime)) {
      const withCurrent = [...base, startTime];
      return withCurrent.sort((a, b) => {
        const [ah, am] = a.split(":").map(Number);
        const [bh, bm] = b.split(":").map(Number);
        return ah * 60 + am - (bh * 60 + bm);
      });
    }
    return base;
  }, [formTimeFrom, startTime]);

  const endTimeOptions = useMemo(() => {
    const base = generateTimeOptionsFromBase(formTimeTo || "");
    // Ensure currently selected endTime is in the list so the Select doesn't show empty
    if (endTime && !base.includes(endTime)) {
      const withCurrent = [...base, endTime];
      return withCurrent.sort((a, b) => {
        const [ah, am] = a.split(":").map(Number);
        const [bh, bm] = b.split(":").map(Number);
        return ah * 60 + am - (bh * 60 + bm);
      });
    }
    return base;
  }, [formTimeTo, endTime]);

  // Calculate duration automatically when start/end times change (but not when duration was manually changed)
  const [isDurationManuallyChanged, setIsDurationManuallyChanged] = useState(false);
  
  useEffect(() => {
    if (startTime && endTime && !isDurationManuallyChanged) {
      const calculatedDuration = calculateDuration(startTime, endTime);
      if (calculatedDuration > 0) {
        setDuration(calculatedDuration.toString());
      }
    }
  }, [startTime, endTime, isDurationManuallyChanged]);

  // When Daily is selected, scroll the daily section into view smoothly
  useEffect(() => {
    if (recurrencePattern === "daily") {
      // Defer slightly to ensure the panel is mounted
      requestAnimationFrame(() => {
        dailyPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
  }, [recurrencePattern]);

  // Keep the duration options anchored to the current diff unless user manually changed duration
  useEffect(() => {
    if (!isDurationManuallyChanged) {
      const diff = startTime && endTime ? calculateDuration(startTime, endTime) : 0;
      const base = diff > 0 ? diff : 30;
      setDurationBase(base);
    }
  }, [startTime, endTime, isDurationManuallyChanged]);

  // Handle duration change - update end time
  const handleDurationChange = (newDuration: string) => {
    setIsDurationManuallyChanged(true); // Mark as manually changed
    setDuration(newDuration);
    if (startTime && newDuration) {
      const newEndTime = addMinutesToTime(startTime, parseInt(newDuration));
      console.log('Duration changed:', { startTime, newDuration, newEndTime }); // Debug log
      setEndTime(newEndTime);
    }
  };

  // Generate duration options anchored to durationBase (stable after manual change)
  const durationOptions = useMemo(() => {
    return [durationBase, durationBase + 30, durationBase + 60, durationBase + 90];
  }, [durationBase]);

  // When user changes start or end time manually, allow auto duration recalc again
  const handleStartChange = (value: string) => {
    setStartTime(value);
    setIsDurationManuallyChanged(false);
  };
  const handleEndChange = (value: string) => {
    setEndTime(value);
    setIsDurationManuallyChanged(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent hideCloseButton className="max-w-[450px] bg-[#F3F3F3] p-4">
            <ScrollArea className="max-h-[85vh]" scrollBarThumbClassName="bg-transparent">
          <div className="space-y-[15px]">
            <h3 className="text-[#008080] font-inter font-bold text-[14px] leading-[18px]">
              Class time
            </h3>

            <div className="space-y-2">
              <label className="text-[#666666] font-inter text-sm">Start</label>
              <Select value={startTime} onValueChange={handleStartChange}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12">
                  <SelectValue placeholder="09:00" />
                </SelectTrigger>
                <SelectContent>
                  {startTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[#666666] font-inter text-sm">End</label>
              <Select value={endTime} onValueChange={handleEndChange}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12">
                  <SelectValue placeholder="09:30" />
                </SelectTrigger>
                <SelectContent>
                  {endTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[#666666] font-inter text-sm">Duration</label>
              <Select value={duration} onValueChange={handleDurationChange}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md h-12">
                  <SelectValue placeholder="30 minutes" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((minutes) => (
                    <SelectItem key={minutes} value={minutes.toString()}>
                      {formatDuration(minutes)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="space-y-[7px] mt-[31px]">
              <h4 className="text-[#008080] font-inter font-bold text-[14px] leading-[18px]">Recurrence pattern</h4>
              <div className="border rounded-md bg-white overflow-hidden">
                <div className="px-4 py-3 font-inter font-bold text-[16px] text-[#262626]">Select</div>
                <div className="grid grid-cols-3 border-t">
                  <label className="flex items-center justify-center gap-3 py-5 cursor-pointer">
                    <input
                      type="radio"
                      name="recurrence"
                      value="daily"
                      checked={recurrencePattern === "daily"}
                      onChange={() => setRecurrencePattern("daily")}
                      className="h-4 w-4 accent-[#008080]"
                    />
                    <span className="font-inter text-[14px] text-[#262626]">Daily</span>
                  </label>
                  <label className="flex items-center justify-center gap-3 py-5 cursor-pointer border-l">
                    <input
                      type="radio"
                      name="recurrence"
                      value="weekly"
                      checked={recurrencePattern === "weekly"}
                      onChange={() => setRecurrencePattern("weekly")}
                      className="h-4 w-4 accent-[#008080]"
                    />
                    <span className="font-inter text-[14px] text-[#262626]">Weekly</span>
                  </label>
                  <label className="flex items-center justify-center gap-3 py-5 cursor-pointer border-l">
                    <input
                      type="radio"
                      name="recurrence"
                      value="monthly"
                      checked={recurrencePattern === "monthly"}
                      onChange={() => setRecurrencePattern("monthly")}
                      className="h-4 w-4 accent-[#008080]"
                    />
                    <span className="font-inter text-[14px] text-[#262626]">Monthly</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Daily options panel - render only when selected to avoid layout gap */}
            {recurrencePattern === "daily" && (
              <div ref={dailyPanelRef} className="mt-3 border rounded-md bg-white">
                <div className="p-4 space-y-4">
                  {/* <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={dailyEveryEnabled}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setDailyEveryEnabled(checked);
                        if (checked) setDailyWeekdayEnabled(false);
                      }}
                      className="h-5 w-5 accent-[#008080] rounded"
                    /> */}
                    {/* <span className="font-inter text-[16px] text-[#262626]">Every</span>
                    <input
                      type="number"
                      min={1}
                      value={dailyInterval}
                      onChange={(e) => setDailyInterval(Math.max(1, Number(e.target.value)))}
                      disabled={!dailyEveryEnabled}
                      className="w-[48px] h-[32px] text-center border rounded-md focus:outline-none"
                    />
                    <span className="font-inter text-[16px] text-[#262626]">Day(s)</span>
                  </label> */}

                  {/* <hr className="border-t" /> */}

                  <label className="flex items-center gap-3">
                    <Checkbox
                      checked={dailyWeekdayEnabled}
                      onCheckedChange={(val) => {
                        const checked = Boolean(val);
                        setDailyWeekdayEnabled(checked);
                        if (checked) setDailyEveryEnabled(false);
                      }}
                      className="h-6 w-6 rounded-[8px] border border-[#CFD3D4] data-[state=checked]:bg-[#008080] data-[state=checked]:border-[#008080] data-[state=checked]:ring-1 data-[state=checked]:ring-[#008080] data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-white data-[state=checked]:text-[#B0CAD9]"
                    />
                    <span className="font-inter text-[14px] text-[#000000]">Every weekday</span>
                  </label>
                </div>
              </div>
            )}

            {/* Weekly options panel */}
            {recurrencePattern === "weekly" && (
              <div className="mt-3 border rounded-md bg-white">
                <div className="p-4 space-y-4">
                  <label className="flex items-center gap-3">
                    <Checkbox
                      checked={true}
                      className="h-6 w-6 rounded-[8px] border border-[#CFD3D4] data-[state=checked]:bg-[#008080] data-[state=checked]:border-[#008080] data-[state=checked]:ring-1 data-[state=checked]:ring-[#008080] data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-white data-[state=checked]:text-[#B0CAD9]"
                    />
                    <span className="font-inter text-[14px] text-[#262626]">Every</span>
                    <input
                      type="number"
                      min={1}
                      value={weeklyInterval}
                      onChange={(e) => setWeeklyInterval(Math.max(1, Number(e.target.value)))}
                      className="w-[39px] h-[24px]  rounded-[8px] text-center border focus:outline-none"
                    />
                    <span className="font-inter text-[14px] text-[#262626]">Week(s) on</span>
                  </label>

                  <hr className="border-t" />

                  <div className="grid grid-cols-3 gap-y-6 gap-x-0">
                    {Object.keys(weeklyDays).map((day) => (
                      <label key={day} className="flex items-center gap-3">
                        <Checkbox
                          checked={weeklyDays[day]}
                          onCheckedChange={() => toggleWeeklyDay(day)}
                          className="h-6 w-6 rounded-[8px] border border-[#CFD3D4] data-[state=checked]:bg-[#008080] data-[state=checked]:border-[#008080] data-[state=checked]:ring-1 data-[state=checked]:ring-[#008080] data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-white data-[state=checked]:text-[#B0CAD9]"
                        />
                        <span className="font-inter text-[14px] text-[#262626]">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Monthly options panel */}
            {recurrencePattern === "monthly" && (
              <div className="mt-3 border rounded-md bg-white">
                <div className="p-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-inter text-[14px] text-[#262626]">The</span>
                      <Select value={monthlyWeekOrdinal} onValueChange={setMonthlyWeekOrdinal}>
                        <SelectTrigger className="w-[130px] bg-white border border-gray-300 rounded-[8px] h-9 px-4">
                          <SelectValue placeholder="First" />
                        </SelectTrigger>
                        <SelectContent>
                          {['First','Second','Third','Fourth','Last'].map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={monthlyWeekday} onValueChange={setMonthlyWeekday}>
                        <SelectTrigger className="w-[120px] bg-white border border-gray-300 rounded-[8px] h-9 px-4">
                          <SelectValue placeholder="Monday" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="font-inter text-[14px] text-[#000000]">Of every</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={monthlyInterval}
                        onChange={(e) => setMonthlyInterval(Math.max(1, Number(e.target.value)))}
                        className="w-[39px] h-[24px] rounded-[8px] text-center border focus:outline-none"
                      />
                      <span className="font-inter text-[14px] text-[#262626]">Month(s)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-[#008080] font-inter font-bold text-[14px] leading-[18px] mt-[31px]">Range of recurrence</h4>
              <div className="grid grid-cols-2 gap-6 items-start">
                <div className="space-y-[15px]">
                  <label className="text-[#000000] font-inter text-[14px] leading-4">Start by</label>
                  <input
                    type="date"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="h-[45px] w-full rounded-[5px] border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#262626] focus:outline-none"
                  />
                </div>
                <div className="space-y-[15px]">
                  <label className="text-[#000000] font-inter text-[14px] leading-4">End by</label>
                  <input
                    type="date"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="h-[45px] w-full rounded-[5px] border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#262626] focus:outline-none"
                  />
                </div>
              </div>
            
            </div>

          <div className="flex justify-center mt-[31px] gap-[10px]">
            <button className=" bg-[#008080] font-inter text-sm font-normal text-white px-[12px] py-[8px] rounded-[5px]">Add Recurring</button>

            <DialogClose asChild>
              <button className=" bg-[#008080] font-inter text-sm font-normal text-white px-[12px] py-[8px] rounded-[5px]" >Cancel</button>
            </DialogClose>

            <button className="bg-[#CBCBCB] text-[#FFFFFF] font-inter text-[14px] rounded-[6px] px-5 py-2">Remove Recurring
            </button>
          </div>
          </ScrollArea>
        </DialogContent>
    </Dialog>
  );
};
