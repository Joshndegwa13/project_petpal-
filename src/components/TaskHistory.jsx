import React, { useContext } from "react";
import { ThemeContext } from "../context/Themecontext"; 

const TaskHistory = ({ tasks, selectedDate, isTaskCompleted }) => {
  const { theme } = useContext(ThemeContext); 
  const completedTasks = tasks.filter((task) => isTaskCompleted(task));

  if (completedTasks.length === 0) {
    return null; // Do not render if there are no completed tasks
  }

  return (
    <div className={`p-4 shadow-md mt-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
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
