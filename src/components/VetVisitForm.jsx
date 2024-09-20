// src/components/VetVisitForm.jsx
import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VetVisitForm = ({ onVetVisitAdded }) => {
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http:localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/vet_visits/`, {
        notes,
        date: date.toISOString(),
      });
      setNotes("");
      setDate(new Date());
      onVetVisitAdded(); // Refresh vet visits
    } catch (error) {
      console.error("Error adding vet visit:", error);
      alert("Failed to add vet visit.");
    }
  };

  return (
    <div className="p-4 bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Add Vet Visit</h2>
      <form onSubmit={handleSubmit}>
        {/* Notes Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Notes</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            placeholder="Enter visit notes"
          />
        </div>
        {/* Date Picker */}
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
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Visit
        </button>
      </form>
    </div>
  );
};

export default VetVisitForm;
