import React, { useState, useEffect, useContext } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, database } from '../firebase/firebase'; 
import { ref as dbRef, set, onValue, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext

const ImageUpload = () => {
  const { theme } = useContext(ThemeContext); // Use theme from context
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const imagesRef = dbRef(database, 'images');
    onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedImages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setImages(fetchedImages);
      }
    });
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setErrorMessage('');
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      const fileId = uuidv4(); 
      const storageRef = ref(storage, `images/${fileId}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // handles the progress of the upload
        },
        (error) => {
          console.error('Upload failed:', error);
          setErrorMessage('Upload failed. Please try again.');
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newImage = {
              id: fileId,
              url: downloadURL,
              description: description,
            };
  
            const isDuplicate = images.some((image) => image.url === downloadURL);
  
            if (!isDuplicate) {
              const newImageRef = dbRef(database, 'images/' + fileId);
              set(newImageRef, newImage)
                .then(() => {
                  setSelectedFile(null); 
                  setDescription(''); 
                  setUploading(false);
                })
                .catch((error) => {
                  setErrorMessage('Error saving image data. Please try again.');
                  setUploading(false);
                });
            } else {
              setErrorMessage('Duplicate image detected. Please upload a different file.');
              setUploading(false);
            }
          });
        }
      );
    } else {
      setErrorMessage('Please select a file to upload.');
    }
  };
  
  const handleDelete = (imageId, imageUrl) => {
    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        const dbImageRef = dbRef(database, `images/${imageId}`);
        remove(dbImageRef)
          .then(() => {
            setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
          })
          .catch((error) => {
            console.error('Error deleting image from database:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting image from storage:', error);
      });
  };

  return (
    <div className={`max-w-7xl mx-auto p-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      
      <div className={`shadow-lg rounded-lg p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col sm:flex-row items-center">
          <input
            type="file"
            onChange={handleFileChange}
            className={`w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} p-2 rounded-md`}
          />
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add a description"
            className={`w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4 p-2 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md`}
          />
          <button
            onClick={handleUpload}
            className={`bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg`}
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className={`shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <img src={image.url} alt="Uploaded" className="w-full h-64 object-cover" />
            <div className="p-4">
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{image.description}</p>
              <button
                onClick={() => handleDelete(image.id, image.url)}
                className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded-lg w-full`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
