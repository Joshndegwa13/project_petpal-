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
import PetProfile from "./components/Petprofile";
import Memories from "./components/Memories";
import ImageUpload from './components/ImageUpload'; 
import ImageDetail from './components/ImageDetail'; 

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} /> {/* Landing page */}
            <Route path="/home" element={<Home />} /> {/* Home page */}
            <Route path="/profile" element={<Viewuserprofile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/avatar-upload" element={<AvatarUpload />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/petprofile" element={<PetProfile />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/image/:id" element={<ImageDetail />} />
            <Route path='/image/upload'></Route>
            <Route path="/Memories" element={<Memories />} />
         </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
