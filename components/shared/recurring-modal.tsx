"use client";

import { Dialog, DialogOverlay, DialogPortal, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";

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

  // Generate duration options based on current difference, adding +30 mins subsequently (4 options)
  const durationOptions = useMemo(() => {
    const diff = startTime && endTime ? calculateDuration(startTime, endTime) : 0;
    const base = diff > 0 ? diff : 30; // fallback to 30 if invalid
    return [base, base + 30, base + 60, base + 90];
  }, [startTime, endTime]);

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
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[350px] p-4 bg-[#F3F3F3] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="space-y-[17px]">
            <h3 className="text-[#008080] font-inter font-bold text-[14px] leading-[18px] pb-[17px]">
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

          <div className="flex justify-center mt-[31px]">
            <DialogClose asChild>
              <button className=" bg-[#008080] font-inter text-sm font-normal text-white px-[12px] py-[8px] rounded-[5px]" >Cancel</button>
            </DialogClose>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};
