import React, { useContext } from "react";
import Navbar from "./Navbar";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons from react-icons
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext to access theme and toggle function

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme and toggleTheme from context

  return (
    <div
      className={`min-h-screen transition duration-500 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />
      <div className="px-4 py-8">
        <div className="flex items-center space-x-4">
          <p className="text-lg">Toggle Dark Mode:</p>
          <button
            onClick={toggleTheme} // Use the toggleTheme from context
            className="p-2 rounded-full bg-red-500 text-white"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
