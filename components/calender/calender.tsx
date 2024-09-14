"use client";

import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { events } from "./event";
import { CustomToolbar } from "./custom-tool-bar";
import React, { useCallback, useState } from "react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface IProps {
  height: number;
}

export const MyCalendar = ({ height }: IProps) => {
  const [date, setDate] = useState(new Date());
  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate);
    },
    [setDate]
  );
  const [view, setView] = useState<View>("day");

  const handleOnChangeView = (newView: View) => {
    setView(newView);
  };

  return (
    <div>
      <Calendar
        date={date}
        localizer={localizer}
        events={events}
        defaultView='week'
        startAccessor='start'
        endAccessor='end'
        view={view}
        onNavigate={onNavigate}
        views={["month", "week", "day"]}
        onView={handleOnChangeView}
        style={{ height, background: "white" }}
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} view={view} onView={handleOnChangeView} />
          ),
        }}
      />
    </div>
  );
};
