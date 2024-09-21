import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get } from "firebase/database";
import { database } from '../firebase/firebase'; 
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext

const ImageDetail = () => {
  const { id } = useParams(); // Get the image ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [image, setImage] = useState(null);
  const { theme } = useContext(ThemeContext); // Access the current theme

  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(database, `memories/${id}`);
      const snapshot = await get(imageRef);
      if (snapshot.exists()) {
        setImage(snapshot.val());
      } else {
        console.error("No such image!");
      }
    };
    
    fetchImage();
  }, [id]);

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <button onClick={() => navigate('/')} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Back
      </button>
      {image && (
        <div className={`shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <img src={image.url} alt="Uploaded" className="w-full h-64 object-cover" />
          <div className="p-4">
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{image.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetail;
