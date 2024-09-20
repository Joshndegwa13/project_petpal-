// src/components/TaskList.jsx

import React from "react";

const TaskList = ({ tasks, onCompleteTask, selectedDate, isTaskCompleted }) => {
  // Separate daily tasks and other tasks
  const dailyTasks = tasks.filter((task) => task.is_daily);
  const otherTasks = tasks.filter((task) => !task.is_daily);

  const renderTaskItem = (task) => {
    const completed = isTaskCompleted(task);
    return (
      <li
        key={task.id}
        className={`mb-2 flex justify-between items-center ${
          completed ? "line-through text-gray-500" : ""
        }`}
      >
        <span>
          {task.description} {task.is_daily && <strong>*</strong>}
        </span>
        {!completed && (
          <button
            onClick={() => onCompleteTask(task.id)}
            className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-500"
          >
            Mark as Done
          </button>
        )}
      </li>
    );
  };

  return (
    <div className="p-4 bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">
        Tasks for {selectedDate.toLocaleDateString()}
      </h2>
      {/* Daily Tasks */}
      <h3 className="text-lg font-semibold mb-2">Daily Tasks</h3>
      {dailyTasks.length > 0 ? (
        <ul>{dailyTasks.map(renderTaskItem)}</ul>
      ) : (
        <p>No daily tasks.</p>
      )}
      {/* Other Tasks */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Other Tasks</h3>
      {otherTasks.length > 0 ? (
        <ul>{otherTasks.map(renderTaskItem)}</ul>
      ) : (
        <p>No tasks for this day.</p>
      )}
    </div>
  );
};

export default TaskList;
