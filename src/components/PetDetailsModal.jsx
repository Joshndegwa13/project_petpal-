import React from 'react';
import { PencilIcon } from '@heroicons/react/solid'; // Ensure hero icons are installed

const PetDetailsModal = ({ pet, onClose, onDelete, onEdit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Pet Details</h2>
          <button
            onClick={onEdit}
            aria-label={`Edit ${pet.petName}`}
            className="text-gray-600 hover:text-gray-800"
          >
            <PencilIcon className="w-6 h-6" />
          </button>
        </div>
        <img
          src={pet.petImage ? pet.petImage : 'https://via.placeholder.com/150'}
          alt={pet.petName}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p><strong>Name:</strong> {pet.petName}</p>
        <p><strong>Type:</strong> {pet.petType}</p>
        <p><strong>Gender:</strong> {pet.petGender}</p>
        <p><strong>Age:</strong> {pet.petAge}</p>
        <p><strong>Breed:</strong> {pet.petBreed}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
            onClick={() => onDelete(pet)}
            aria-label={`Delete ${pet.petName}`}
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="ml-4 text-gray-600 hover:text-gray-800"
            aria-label="Close details"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;
