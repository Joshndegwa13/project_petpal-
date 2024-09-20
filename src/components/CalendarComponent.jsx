// src/components/CalendarComponent.jsx
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ tasks, vetVisits, onDateChange }) => {
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const hasTask = tasks.some(
        (task) => task.date && task.date.startsWith(dateString)
      );
      const hasVisit = vetVisits.some((visit) =>
        visit.date.startsWith(dateString)
      );

      return (
        <div>
          {hasTask && <span className="bg-blue-200 text-xs px-1">Task</span>}
          {hasVisit && <span className="bg-red-200 text-xs px-1">Vet</span>}
        </div>
      );
    }
  };

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Calendar</h2>
      <Calendar onChange={onDateChange} tileContent={tileContent} />
    </div>
  );
};

export default CalendarComponent;
