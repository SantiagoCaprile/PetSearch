import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage({ onChange, date }) {
  return (
    <Calendar
      selectRange={false}
      locale="es-ES"
      onChange={onChange}
      value={date}
    />
  );
}
