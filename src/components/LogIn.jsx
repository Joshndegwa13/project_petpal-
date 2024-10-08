import React, { useState, useContext } from "react";
import login from "../assets/images/login.jpg";
import { useNavigate } from "react-router-dom"; 
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../context/authcontext";
import { ThemeContext } from "../context/Themecontext"; // Import ThemeContext
import Navbar from "./Navbar.jsx";

function LogIn() {
  const { theme } = useContext(ThemeContext); // Use theme from context
  const navigate = useNavigate(); 
  const { userLoggedIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
      setEmail(""); 
      setPassword(""); 
      navigate('/home'); 
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSigningIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <Navbar />
      <div className="w-full mb-8">
        {/* <h1 className="text-3xl font-bold text-red-500 relative ml-20">PetPal</h1> */}
        <div className="w-full h-0.5 bg-gray-400 mt-2"></div>
      </div>

      <div className="w-full min-h-screen flex justify-center items-center py-12">
        <div className={`w-full max-w-4xl shadow-lg flex flex-col md:flex-row items-center rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative w-full md:w-1/2 h-48 md:h-auto">
            <img src={login} alt="login" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">LogIn</h3>
            <p className="text-sm mb-4">Welcome back! Please enter your details</p>

            <form onSubmit={onSubmit} className="flex flex-col">
              <label className="mb-1" htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                placeholder="Enter Your Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
                required
              />
              <label className="mb-1" htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSigningIn}
                className="text-white bg-red-600 py-2 my-4 w-full rounded hover:bg-red-700"
              >
                {isSigningIn ? "Signing In..." : "LogIn"}
              </button>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className="text-sm mt-2">
                <p className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                </p>
                <p>
                  Don't have an Account?{" "}
                  <a 
                    href="#" 
                    className="text-blue-600 hover:underline" 
                    onClick={() => navigate('/registration')}
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
