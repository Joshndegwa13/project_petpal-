import React, { useState, useContext } from "react";
import HamburgerMenu from "react-hamburger-menu";
import ProfileDropdown from "../components/ProfileDropdown";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { userAvatar } = useContext(UserContext); // Access avatar from context
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme from context
  const navigate = useNavigate(); // Hook for navigation

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing user data, etc.)
    navigate("/");
  };

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu for Mobile (Hidden on Large Screens) */}
          <div className="lg:hidden">
            <HamburgerMenu
              isOpen={isOpen}
              menuClicked={toggleMenu}
              width={18}
              height={15}
              strokeWidth={2}
              rotate={0}
              color={theme === "dark" ? "white" : "black"}
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>

          {/* Navigation Links (Visible on larger screens) */}
          <div className={`hidden lg:flex space-x-10`}>
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-red-400" : "text-red-500"
              }`}
            >
              PetPal
            </h1>
            <Link
              to="/home"
              className={`hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/petprofile"
              className={`hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Pet Profile
            </Link>
            <Link
              to="/tasks"
              className={`hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Tasks
            </Link>
            <Link
              to="/memories"
              className={`hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Memories
            </Link>
            <Link
              to="/occasions/new"
              className={`hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Treatments
            </Link>
          </div>

          {/* Dark Mode Toggle and Profile Avatar */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-800" />
              )}
            </button>

            {/* Profile Icon */}
            <div className="relative">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleProfile}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleProfile}
                />
              )}
              {isProfileOpen && <ProfileDropdown />}
            </div>

            {/* Logout Button for large screens */}
            <div className="hidden lg:block">
              <button
                onClick={handleLogout}
                className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md ${
                  theme === "dark" ? "bg-red-600" : "bg-red-500"
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Visible only when Hamburger is clicked on small screens) */}
        {isOpen && (
          <div className="lg:hidden mt-2 space-y-2">
            <Link
              to="/"
              className={`block hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`block hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Pet Profile
            </Link>
            <Link
              to="/tasks"
              className={`block hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Tasks
            </Link>
            <Link
              to="/memories"
              className={`block hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Memories
            </Link>
            <Link
              to="/occasions/new"
              className={`block hover:text-red-500 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Treatments
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
