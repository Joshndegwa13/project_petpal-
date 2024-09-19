import React, { useState, useEffect } from 'react';
import { ref, set, update, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from '../firebase/firebase';

const PetForm = ({ onAddPet, onClose, petToEdit }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (petToEdit) {
      setPetName(petToEdit.petName || '');
      setPetType(petToEdit.petType || '');
      setPetGender(petToEdit.petGender || '');
      setPetAge(petToEdit.petAge || '');
      setPetBreed(petToEdit.petBreed || '');
      setPetImage(null);
    }
  }, [petToEdit]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let petImageUrl = '';
    try {
      if (petImage) {
        const imageRef = storageRef(storage, `pets/${Date.now()}_${petImage.name}`);
        await uploadBytes(imageRef, petImage);
        petImageUrl = await getDownloadURL(imageRef);
      }

      const petData = {
        petName,
        petType,
        petGender,
        petAge,
        petBreed,
        petImage: petImageUrl,
      };

      if (petToEdit) {
        const petRef = ref(database, `pets/${petToEdit.id}`);
        await update(petRef, petData);
      } else {
        const petsRef = ref(database, 'pets');
        const newPetRef = push(petsRef);
        await set(newPetRef, petData);
      }

      onAddPet(petData); // Notify parent to update pet list
      clearForm();
      onClose(); // Close the form
    } catch (error) {
      console.error('Error uploading or saving pet data:', error);
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setPetName('');
    setPetType('');
    setPetGender('');
    setPetAge('');
    setPetBreed('');
    setPetImage(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">{petToEdit ? 'Edit Pet Details' : 'Add Pet Details'}</h2>

          {/* Form Fields */}
          {/* Pet Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Name</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Pet Type Select Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Type</label>
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Pet Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="goldfish">Goldfish</option>
              <option value="bird">Bird</option>
            </select>
          </div>

          {/* Pet Gender Select Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Gender</label>
            <select
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Pet Age Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Age</label>
            <input
              type="number"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Pet Breed Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Breed</label>
            <input
              type="text"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Image Upload Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload Pet Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-gray-300 rounded" />
            {petImage && <img src={URL.createObjectURL(petImage)} alt="Pet Preview" className="mt-4 w-24 h-24 object-cover rounded" />}
          </div>

          {/* Submit and Cancel Buttons */}
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : petToEdit ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetForm;
