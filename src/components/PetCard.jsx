// PetCard.jsx
import React from 'react';

const PetCard = ({ pet, onClick }) => {
  return (
    <div key={pet.id}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={pet.petImage ? pet.petImage : 'https://via.placeholder.com/150'}
        alt={pet.petName ? `${pet.petName}'s photo` : 'Pet'}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{pet.petName || 'Unnamed Pet'}</h3>
        <p>{pet.petBreed || 'Unknown Breed'}</p>
      </div>
    </div>
  );
};

export default PetCard;
