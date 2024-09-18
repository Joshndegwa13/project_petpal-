// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Viewuserprofile from "../src/components/Viewuserprofile";
import Home from "../src/components/Home";
import Settings from "../src/components/Settings";
import AvatarUpload from "../src/components/AvatarUpload";
import { UserProvider } from "../src/context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Viewuserprofile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/avatar-upload" element={<AvatarUpload />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
