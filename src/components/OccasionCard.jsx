import React from "react";
import { useNavigate } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { database } from "../firebase/firebase";

function OccasionCard({ occasion }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/occasions/edit/${occasion.id}`, { state: { occasion } });
  };

  const handleDelete = () => {
    const occasionRef = ref(database, `occasions/${occasion.id}`);
    remove(occasionRef)
      .then(() => {
        console.log("Occasion deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting occasion:", error);
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold mb-2">{occasion.name}</h3>
      <p className="text-gray-600">Date: {occasion.date}</p>
      <p className="text-gray-600">Time: {occasion.time}</p>
      <p className="text-gray-600">Pet: {occasion.petName}</p>
      <p className="text-gray-600 mb-4">Notes: {occasion.notes}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default OccasionCard;
