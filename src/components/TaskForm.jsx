import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ onTaskAdded }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDaily, setIsDaily] = useState(false); // New state

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http:localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting task:", {
        description,
        date: isDaily ? null : date.toISOString(),
        completed: false,
        is_daily: isDaily,
      });

      await axios.post(`${API_BASE_URL}/tasks/`, {
        description,
        date: isDaily ? null : date.toISOString(),
        completed: false,
        is_daily: isDaily,
      });
      setDescription("");
      setDate(new Date());
      setIsDaily(false); // Reset the checkbox
      onTaskAdded(); // Refresh tasks
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div className="p-4 bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter task description"
          />
        </div>
        {/* Date Picker */}
        {!isDaily && (
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
        )}
        {/* Is Daily Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isDaily}
              onChange={(e) => setIsDaily(e.target.checked)}
            />
            <span className="ml-2">Is Daily Task</span>
          </label>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;