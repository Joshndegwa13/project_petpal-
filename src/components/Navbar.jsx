import React, { useState, useContext } from "react";
import HamburgerMenu from "react-hamburger-menu";
import ProfileDropdown from "../components/ProfileDropdown";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { userAvatar } = useContext(UserContext); // Access avatar from context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white">
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
              color="black"
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>

          {/* Navigation Links (Visible on larger screens) */}
          <div className={`hidden lg:flex space-x-10`}>
            <h1 className="text-3xl font-bold text-red-500">PetPal</h1>
            <Link
              to="/"
              className="text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/petprofile"
              className="text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Pet Profile
            </Link>
            <Link
              to="/tasks"
              className="text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Tasks
            </Link>
            <Link
              to="/memories"
              className="text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Memories
            </Link>
          </div>

          {/* Profile Avatar and Logout Button */}
          <div className="flex items-center space-x-4">
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
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">
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
              className="block text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Pet Profile
            </Link>
            <Link
              to="/tasks"
              className="block text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Tasks
            </Link>
            <Link
              to="/memories"
              className="block text-gray-900 hover:text-red-500 text-lg font-medium"
            >
              Memories
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
