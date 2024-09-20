import React, { useState, useEffect, useContext } from 'react';
import { ref, onValue, remove, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import PetForm from './PetForm';
import PetCard from './PetCard';
import PetDetailsModal from './PetDetailsModal';
import { database, storage } from '../firebase/firebase';
import Navbar from "./Navbar.jsx";
import { ThemeContext } from '../context/Themecontext.jsx'; // Import ThemeContext

const PetProfile = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [petToEdit, setPetToEdit] = useState(null);
  const { theme } = useContext(ThemeContext); // Access theme from context

  useEffect(() => {
    const petsRef = ref(database, 'pets');
    const unsubscribe = onValue(petsRef, (snapshot) => {
      const petsData = snapshot.val();
      if (petsData) {
        const petsArray = Object.entries(petsData).map(([id, data]) => ({ id, ...data }));
        setPets(petsArray);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddPet = async (newPet) => {
    try {
      if (petToEdit) {
        const petRef = ref(database, `pets/${petToEdit.id}`);
        await set(petRef, newPet);
        setPets(pets.map((pet) => (pet.id === petToEdit.id ? newPet : pet)));
        setPetToEdit(null);
      } else {
        const newPetRef = ref(database, `pets/${newPet.id}`);
        await set(newPetRef, newPet);
        setPets([...pets, newPet]);
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error adding or updating pet:", error);
    }
  };

  const handleDeletePet = async (petToDelete) => {
    try {
      const petRef = ref(database, `pets/${petToDelete.id}`);
      await remove(petRef);
      setPets(pets.filter((pet) => pet.id !== petToDelete.id));
      setSelectedPet(null);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleEditPet = (pet) => {
    setPetToEdit(pet);
    setShowForm(true);
    setSelectedPet(null);
  };

  const handleShowDetails = (pet) => {
    setSelectedPet(pet);
  };

  const handleImageUpload = async (file) => {
    try {
      const imageRef = storageRef(storage, `pet-images/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return '';
    }
  };

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
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
