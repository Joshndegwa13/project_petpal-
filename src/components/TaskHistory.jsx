// src/components/TaskHistory.jsx

import React from "react";

const TaskHistory = ({ tasks, selectedDate, isTaskCompleted }) => {
  const completedTasks = tasks.filter((task) => isTaskCompleted(task));

  if (completedTasks.length === 0) {
    return null; // Do not render if there are no completed tasks
  }

  return (
    <div className="p-4 bg-white shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} className="mb-2">
            <strong>{task.description}</strong>{" "}
            {task.is_daily && <strong>*</strong>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskHistory;
