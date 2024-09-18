import React, { useState } from "react";
import { Link } from "react-router-dom";
import AvatarUploadModal from "../components/AvatarUpload"; // Ensure the correct path

const ProfileDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    // Close the modal when the user clicks outside the modal content
    if (event.target.id === "modalOverlay") {
      closeModal();
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
        <Link
          to="/profile"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          View Profile
        </Link>
        <Link
          to="/settings"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Settings
        </Link>
        <button
          onClick={openModal}
          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Upload Image
        </button>
      </div>

      {/* Modal for avatar upload */}
      {isModalOpen && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal} // Add click handler for closing modal
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <AvatarUploadModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
