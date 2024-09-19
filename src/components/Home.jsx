import React from "react";
import Navbar from "./Navbar.jsx";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-red-700 h-96 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold text-center">
          Welcome to PetPal: The Ultimate Pet Management Companion
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Marketing Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="src/assets/images/parrotlan.jpg"
            alt="Our Product"
            className="h-32 mb-4 rounded-md"
          />
          <h2 className="text-2xl font-semibold mb-4">Why Choose PetPal?</h2>
          <p className="text-gray-600 text-center">
            PetPal is designed to simplify pet ownership. Whether you're a new
            pet parent or a seasoned one, our app helps you manage all aspects
            of your pet's care. From scheduling vet appointments to remembering
            feeding times, we've got you covered. But that's not all—PetPal is
            also your memory companion, letting you store and cherish every
            beautiful moment you share with your furry friends.
          </p>
        </div>

        {/* Pet Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="src/assets/images/greydog.jpg"
            alt="Pet Profile"
            className="h-32 mb-4 rounded-md"
          />
          <h2 className="text-2xl font-semibold mb-4">
            Manage Your Pet's Profile
          </h2>
          <p className="text-gray-600 text-center">
            With PetPal, you can easily manage your pet's essential information.
            Track details like breed, age, and health history. Have everything
            you need in one place for seamless care and quick reference.
          </p>
        </div>

        {/* Tasks Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="src/assets/images/cat.jpg"
            alt="Tasks"
            className=" h-32 mb-4 rounded-md"
          />
          <h2 className="text-2xl font-semibold mb-4">Never Miss a Task</h2>
          <p className="text-gray-600 text-center">
            PetPal helps you stay on top of important tasks like feeding,
            grooming, and vet visits. Set reminders for everything your pet
            needs, ensuring that they are always happy and healthy. Keep track
            of daily, weekly, and long-term pet care tasks with ease.
          </p>
        </div>

        {/* Memories Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="src/assets/images/rabbitlan.jpg"
            alt="Memories"
            className="h-32 mb-4 rounded-md"
          />
          <h2 className="text-2xl font-semibold mb-4">Capture Memories</h2>
          <p className="text-gray-600 text-center">
            Life with a pet is full of moments to cherish. With PetPal, you can
            create a gallery of all your favorite memories, from first walks to
            fun adventures. Share your pet’s special moments with friends and
            family while creating a lifetime of memories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;