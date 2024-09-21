import React, { useContext } from 'react';
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext

const ImageCard = ({ imageUrl, description, onViewClick }) => {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <div className={`shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <img src={imageUrl} alt="Uploaded" className="w-full h-64 object-cover" />
      <div className="p-4">
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{description}</p>
        <button 
          onClick={onViewClick} 
          className="mt-2 py-1 px-4 bg-blue-500 text-white rounded"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
