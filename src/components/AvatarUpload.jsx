import React, { useState, useContext } from "react";
import { storage } from "../firebase/firebase"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from "../context/UserContext"; 
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext

const AvatarUploadModal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { updateUserAvatar } = useContext(UserContext);
  const { theme } = useContext(ThemeContext); // Get the theme

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `avatars/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        updateUserAvatar(downloadURL);
        setUploading(false);
        onClose(); // Close the modal after successful upload
      }
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`p-8 rounded-lg shadow-lg max-w-md w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
        <input
          type="file"
          onChange={handleImageChange}
          className={`mb-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        />
        <button
          onClick={handleUpload}
          className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        <button
          onClick={onClose}
          className={`bg-gray-500 text-white px-4 py-2 mt-4 rounded w-full`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AvatarUploadModal;
