import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, set } from 'firebase/database'; // Import remove and set for database operations
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage methods
import PetForm from './PetForm';
import PetCard from './PetCard';
import PetDetailsModal from './PetDetailsModal';
import { database, storage } from '../firebase/firebase'; // Import Firebase database and storage

const PetProfile = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [petToEdit, setPetToEdit] = useState(null);

  // Fetch pets from the database when the component mounts
  useEffect(() => {
    const petsRef = ref(database, 'pets');
    onValue(petsRef, (snapshot) => {
      const petsData = snapshot.val();
      if (petsData) {
        const petsArray = Object.entries(petsData).map(([id, data]) => ({ id, ...data })); // Convert object to array and include ID
        setPets(petsArray);
      }
    });
  }, []);

  // Function to handle adding a new pet or updating an existing pet
  const handleAddPet = async (newPet) => {
    if (petToEdit) {
      // If editing, update the existing pet
      const petRef = ref(database, `pets/${petToEdit.id}`);
      await set(petRef, newPet);
      setPets(pets.map((pet) => (pet.id === petToEdit.id ? newPet : pet)));
      setPetToEdit(null);
    } else {
      // Add new pet
      const newPetRef = ref(database, `pets/${newPet.id}`);
      await set(newPetRef, newPet);
      setPets([...pets, newPet]);
    }
    setShowForm(false);
  };

  // Function to handle deleting a pet
  const handleDeletePet = async (petToDelete) => {
    const petRef = ref(database, `pets/${petToDelete.id}`);
    await remove(petRef);
    setPets(pets.filter((pet) => pet.id !== petToDelete.id));
    setSelectedPet(null);
  };

  // Function to handle opening the form for editing a pet
  const handleEditPet = (pet) => {
    setPetToEdit(pet);
    setShowForm(true);
    setSelectedPet(null);
  };

  // Function to handle showing pet details in a modal
  const handleShowDetails = (pet) => {
    setSelectedPet(pet);
  };

  // Function to handle image upload and return the image URL
  const handleImageUpload = async (file) => {
    const imageRef = storageRef(storage, `pet-images/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">PetPal</h1>
        </nav>
      </header>

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-700"
      >
        +
      </button>

      {showForm && (
        <PetForm
          onAddPet={async (newPet) => {
            if (newPet.petImage) {
              const imageURL = await handleImageUpload(newPet.petImage);
              newPet.petImage = imageURL;
            }
            handleAddPet(newPet);
          }}
          onClose={() => setShowForm(false)}
          petToEdit={petToEdit}
        />
      )}

      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onClick={() => handleShowDetails(pet)} />
        ))}
      </div>

      {selectedPet && (
        <PetDetailsModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onDelete={() => handleDeletePet(selectedPet)}
          onEdit={() => handleEditPet(selectedPet)}
        />
      )}
    </div>
  );
};

export default PetProfile;
