import React from 'react';

const PetCard = ({ pet, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={pet.petImage ? pet.petImage : 'https://via.placeholder.com/150'} // Placeholder image
        alt={pet.petName ? `${pet.petName}'s photo` : 'Pet'} // Enhanced alt text
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{pet.petName || 'Unnamed Pet'}</h3> {/* Fallback text */}
        <p>{pet.petBreed || 'Unknown Breed'}</p> {/* Fallback text */}
      </div>
    </div>
  );
};

export default PetCard;
