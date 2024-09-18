import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { auth } from "../firebase/firebase";
import { updateProfile, updateEmail } from "firebase/auth";

function Viewuserprofile() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch the current authenticated user's info
  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const [fName, lName] = currentUser.displayName
          ? currentUser.displayName.split(" ")
          : ["", ""];
        setUser(currentUser);
        setFirstName(fName);
        setLastName(lName);
        setEmail(currentUser.email || "");
      }
    };
    fetchUser();
  }, []);

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        // Update the display name (first name and last name)
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        // Update the email
        await updateEmail(user, email);

        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="px-4 py-4">
      <Navbar />
      <div className="px-24">
        <p className="text-2xl font-bold underline mt-10 mb-6">
          Account Settings
        </p>
        <div className="w-full h-0.5 bg-gray-400"></div>

        <p className="font-semibold underline mt-10">Your Information</p>

        <div className="flex flex-col md:flex-row items-start md:space-x-6">
          <form
            className="flex flex-col mt-10 space-y-4 w-full max-w-sm"
            onSubmit={handleSubmit}
          >
            <div>
              <p>First Name*</p>
              <input
                type="text"
                className="w-full h-9 border border-black mb-2 px-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <p>Last Name*</p>
              <input
                type="text"
                className="w-full h-9 border border-black mb-2 px-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <p>Email*</p>
              <input
                type="email"
                className="w-full h-9 border border-black mb-2 px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Viewuserprofile;
