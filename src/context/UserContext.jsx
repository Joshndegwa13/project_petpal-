// UserContext.js
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userAvatar, setUserAvatar] = useState(null);

  // Load avatar from localStorage or Firebase when the component mounts
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    }
  }, []);

  const updateUserAvatar = (url) => {
    setUserAvatar(url);
    localStorage.setItem("userAvatar", url);
  };

  return (
    <UserContext.Provider value={{ userAvatar, updateUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
