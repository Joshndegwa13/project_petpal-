import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons from react-icons

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the root element (html or body)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition duration-500">
      <Navbar />
      <div className="px-4 py-8">
        <div className="flex items-center space-x-4">
          <p className="text-lg">Toggle Dark Mode:</p>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-red-500 text-white"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
