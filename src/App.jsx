// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Viewuserprofile from "../src/components/Viewuserprofile";
import Home from "../src/components/Home";
import Settings from "../src/components/Settings";
import AvatarUpload from "../src/components/AvatarUpload";
import Landing from "./components/Landing";
import { UserProvider } from "../src/context/UserContext";
import LogIn from "./components/LogIn";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";

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
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/petprofile" element={<PetProfile  />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
