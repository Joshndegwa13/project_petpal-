import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import landing from '../assets/images/landing.jpg';

const Landing = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login route
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login route
  };

  const handleSignUp = () => {
    navigate('/registration'); // Navigate to the registration route
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-white">
      {/* Background Image without dark overlay */}
      <div
        style={{
          backgroundImage: `url(${landing})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="absolute inset-0"
      />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="font-extrabold text-4xl text-red-800 hover:text-red-600 transition duration-300">
          <button onClick={() => navigate('/')}>PetPal</button>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-red-600 px-6 py-2 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:bg-red-700 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-red-600 px-6 py-2 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:bg-red-700 transition duration-300"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen space-y-6">
        <h1 className="text-5xl md:text-8xl lg:text-6xl font-extrabold text-red-900 tracking-wide leading-tight mb-4">
          Take Better Care of Your Pet
        </h1>
        <button
          className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-8 rounded-full text-2xl font-bold shadow-xl transform hover:scale-110 transition duration-500 ease-in-out"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>

      {/* Feature Section */}
      <div className="relative z-10 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-10 bg-gradient-to-t from-white to-red-50 rounded-lg shadow-lg">
        <div className="bg-white text-black p-6 rounded-xl shadow-xl border border-transparent hover:border-red-600 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Manage your pet's daily needs
          </h3>
          <p className="text-lg text-gray-600">
            All your pet care needs in one place, effortlessly organized.
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-xl shadow-xl border border-transparent hover:border-red-600 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Set veterinary appointments
          </h3>
          <p className="text-lg text-gray-600">
            Never miss an important appointment again.
          </p>
        </div>
        <div className="bg-white text-black p-6 rounded-xl shadow-xl border border-transparent hover:border-red-600 transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-bold text-red-700 mb-2">
            Check your pet's history
          </h3>
          <p className="text-lg text-gray-600">
            Quick access to all your pet's important records.
          </p>
        </div>
      </div>

      {/* Footer or Additional Content */}
      <div className="bg-red-800 text-white text-center py-10 shadow-inner">
        <p className="text-xl font-semibold">
          PetPal helps you take the best care of your furry friends!
        </p>
      </div>
    </div>
  );
};

export default Landing;
