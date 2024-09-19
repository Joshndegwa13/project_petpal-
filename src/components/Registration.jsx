import React, { useState } from "react";
import signup from "../assets/images/signup.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../firebase/auth"; 
import { useAuth } from "../context/authcontext";

function Registration() {
  const navigate = useNavigate(); // Initialize navigate
  const { userLoggedIn } = useAuth(); // Access userLoggedIn from context
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsRegistering(true);

    try {
      // Firebase registration call
      await doCreateUserWithEmailAndPassword(email, password);
      
      // Clear form fields after successful registration
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate('/home'); // Navigate to home page after registration
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsRegistering(false);
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!userLoggedIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate('/home'); // Navigate to home page after Google sign-in
      } catch (err) {
        setErrorMessage(err.message);
      }
      setIsSigningIn(false);
    }
  };

  return (
    <div>
      <div className="w-full mb-8">
        <h1 className="text-3xl font-bold text-red-500 relative ml-20">
          PetPal
        </h1>
        <div className="w-full h-0.5 bg-gray-400 mt-2"></div>
      </div>
      <div className="w-full min-h-screen flex justify-center items-center py-12">
        <div className="w-full max-w-4xl bg-white shadow-lg flex flex-col md:flex-row items-center rounded-lg overflow-hidden">
          <div className="relative w-full md:w-1/2 h-48 md:h-auto">
            <img src={signup} alt="signup" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Registration</h3>
            <p className="text-sm mb-4">Welcome to PetPal! Please enter your details</p>

            <form onSubmit={onSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Enter Your Full Name*"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
              />
              <input
                type="text"
                placeholder="Enter Your Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
              />
              <input
                type="password"
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
              />
              <button
                type="submit"
                disabled={isRegistering}
                className="text-white bg-red-500 py-2 my-4 w-full rounded hover:bg-red-700"
              >
                Register
              </button>
              
              {/* Google Sign-In Button */}
              <button
                onClick={onGoogleSignIn}
                disabled={isSigningIn}
                className="text-black border border-gray-400 py-2 my-4 w-full rounded hover:bg-gray-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
                  <path fill="#4285F4" d="M24 9.5c3.12 0 5.83 1.1 7.99 2.91l5.88-5.88C33.9 3.56 29.21 1.5 24 1.5 14.86 1.5 7.37 7.38 4.68 15.44l6.85 5.33C13.32 15.36 18.21 9.5 24 9.5z" />
                  <path fill="#34A853" d="M24 43.5c5.17 0 9.53-1.72 12.69-4.68l-6.08-4.92c-1.76 1.13-4.01 1.8-6.61 1.8-5.01 0-9.26-3.39-10.77-7.96l-6.73 5.19C10.35 39.46 16.72 43.5 24 43.5z" />
                  <path fill="#FBBC05" d="M35.65 38.82C39.24 35.7 41.5 30.36 41.5 24c0-1.16-.1-2.3-.29-3.39H24v7.89h10.01c-.46 2.36-1.78 4.36-3.66 5.77l6.3 4.94z" />
                  <path fill="#EA4335" d="M10.45 28.33C9.99 26.99 9.75 25.54 9.75 24c0-1.54.24-2.99.7-4.33l-6.85-5.33C2.31 17.61 1.5 20.71 1.5 24c0 3.29.81 6.39 2.35 9.33l6.6-5z" />
                </svg>
                Sign in with Google
              </button>

              {/* Error Message */}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className="text-sm mt-2">
                <p>
                  Already have an Account?{" "}
                  <a 
                    href="#" 
                    className="text-blue-600 hover:underline" 
                    onClick={() => navigate('/login')} // Navigate to Login page
                  >
                    LogIn
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

export default Registration;
