import React from 'react';
import { PencilIcon, DocumentTextIcon } from '@heroicons/react/solid'; // Import task icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PetDetailsModal = ({ pet, onClose, onDelete, onEdit }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleTaskClick = () => {
    navigate('/tasks'); // Navigate to tasks page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pet Details</h2>
          <div className="flex items-center">
            <button onClick={handleTaskClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 mr-4">
              <DocumentTextIcon className="w-6 h-6" /> {/* Task icon */}
            </button>
            <button onClick={onEdit} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200">
              <PencilIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <img
          src={pet.petImage ? pet.petImage : 'https://via.placeholder.com/150'}
          alt={pet.petName}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-900 dark:text-gray-300"><strong>Name:</strong> {pet.petName}</p>
        <p className="text-gray-900 dark:text-gray-300"><strong>Type:</strong> {pet.petType}</p>
        <p className="text-gray-900 dark:text-gray-300"><strong>Gender:</strong> {pet.petGender}</p>
        <p className="text-gray-900 dark:text-gray-300"><strong>Age:</strong> {pet.petAge}</p>
        <p className="text-gray-900 dark:text-gray-300"><strong>Breed:</strong> {pet.petBreed}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
            onClick={() => onDelete(pet)}
          >
            Delete
          </button>
          <button onClick={onClose} className="ml-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;
