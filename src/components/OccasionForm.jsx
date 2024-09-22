import React, { useState } from "react";
import { ref, set, update, push } from "firebase/database";
import { database } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function OccasionForm({ occasion = null }) {
  const [occasionName, setOccasionName] = useState(occasion?.name || "");
  const [date, setDate] = useState(occasion?.date || "");
  const [time, setTime] = useState(occasion?.time || "");
  const [petName, setPetName] = useState(occasion?.petName || "");
  const [notes, setNotes] = useState(occasion?.notes || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const occasionData = { name: occasionName, date, time, petName, notes };

    if (occasion) {
      // Edit existing occasion
      const occasionRef = ref(database, `occasions/${occasion.id}`);
      update(occasionRef, occasionData);
    } else {
      // Add new occasion
      const occasionRef = ref(database, "occasions");
      const newOccasionRef = push(occasionRef);
      set(newOccasionRef, occasionData);
    }

    // Redirect to the list of occasions after submission
    navigate("/occasions");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {occasion ? "Edit Treatment" : "Add New Treatment"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Treatment name"
          value={occasionName}
          onChange={(e) => setOccasionName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          {occasion ? "Update Treatment" : "Add Treatment"}
        </button>
      </form>
    </div>
  );
}

export default OccasionForm;
