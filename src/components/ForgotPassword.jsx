import React, { useState } from "react";
import { doPasswordReset } from "../firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Send password reset email
      await doPasswordReset(email);
      setSuccessMessage("Password reset email sent successfully! Check your inbox.");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="w-full mb-8">
        <h1 className="text-3xl font-bold text-red-500 relative ml-20">
          PetPal
        </h1>
        <div className="w-full h-0.5 bg-gray-400 mt-2"></div>
      </div>

      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Reset Password</h3>
          <p className="text-sm mb-4">Please enter your email to reset your password</p>

          <form onSubmit={onSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Enter Your Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-red-500 py-2 my-4 w-full rounded hover:bg-red-700"
            >
              {isSubmitting ? "Sending..." : "Reset Password"}
            </button>

            {/* Display error or success message */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div className="text-sm mt-2">
              <p>
                Don't have an Account?{" "}
                <a href="#" className="text-blue-600 hover:underline">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
