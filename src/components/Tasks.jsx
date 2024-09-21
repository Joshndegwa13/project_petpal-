import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import VetVisitForm from "../components/VetVisitForm";
import CalendarComponent from "../components/CalendarComponent";
import TaskHistory from "../components/TaskHistory";
import TaskList from "../components/TaskList";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import Navbar from "../components/Navbar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [vetVisits, setVetVisits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http:localhost:8000";

  // Fetch tasks and vet visits
  useEffect(() => {
    fetchTasks();
    fetchVetVisits();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchVetVisits = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vet_visits/`);
      setVetVisits(response.data);
    } catch (error) {
      console.error("Error fetching vet visits:", error);
    }
  };

  // Check if a task is completed for the selected date
  const isTaskCompleted = (task) => {
    return task.completions.some(
      (completion) =>
        new Date(completion.date).toDateString() === selectedDate.toDateString()
    );
  };

  // Handle marking task as completed
  const handleCompleteTask = async (taskId) => {
    try {
      await axios.post(`${API_BASE_URL}/tasks/${taskId}/complete`);
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Tasks for the selected date
  const tasksForSelectedDate = tasks.filter((task) => {
    const taskIsForDate =
      task.is_daily ||
      (task.date &&
        new Date(task.date).toDateString() === selectedDate.toDateString());
    const taskNotCompleted = !isTaskCompleted(task);
    return taskIsForDate && taskNotCompleted;
  });

  // Progress calculation for selected date
  const totalTasksForDate = tasks.filter((task) => {
    const taskIsForDate =
      task.is_daily ||
      (task.date &&
        new Date(task.date).toDateString() === selectedDate.toDateString());
    return taskIsForDate;
  }).length;

  const completedTasksForDate = tasks.filter((task) => {
    const taskIsForDate =
      task.is_daily ||
      (task.date &&
        new Date(task.date).toDateString() === selectedDate.toDateString());
    return taskIsForDate && isTaskCompleted(task);
  }).length;

  const progress =
    totalTasksForDate > 0
      ? (completedTasksForDate / totalTasksForDate) * 100
      : 0;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row p-4">
        {/* Left Side */}
        <div className="w-full md:w-2/3 md:pr-4 divide-y-2 divide-red-500 pl-20">
          {/* Forms */}
          <TaskForm onTaskAdded={fetchTasks} />
          <VetVisitForm onVetVisitAdded={fetchVetVisits} />
          {/* Task List */}
          <TaskList
            tasks={tasksForSelectedDate}
            onCompleteTask={handleCompleteTask}
            selectedDate={selectedDate}
            isTaskCompleted={isTaskCompleted}
          />
          {/* Task History */}
          <TaskHistory
            tasks={tasks}
            selectedDate={selectedDate}
            isTaskCompleted={isTaskCompleted}
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 md:pl-4 mt-2 md:mt-0 pr-20">
          {/* Progress Bar */}
          <ProgressBar progress={progress} selectedDate={selectedDate} />
          {/* Calendar */}
          <CalendarComponent
            tasks={tasks}
            vetVisits={vetVisits}
            onDateChange={setSelectedDate}
          />
        </div>
      </div>
    </>
  );
};

export default Tasks;