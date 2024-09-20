import React from 'react';

const PetCard = ({ pet, onClick }) => {
  return (
    <div
      key={pet.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={pet.petImage ? pet.petImage : 'https://via.placeholder.com/150'}
        alt={pet.petName ? `${pet.petName}'s photo` : 'Pet'}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {pet.petName || 'Unnamed Pet'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {pet.petBreed || 'Unknown Breed'}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
