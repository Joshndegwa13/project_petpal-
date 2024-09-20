// src/components/ProgressBar.jsx

import React from "react";

const ProgressBar = ({ progress, selectedDate }) => {
  return (
    <div className="p-4 bg-white mb-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Progress for {selectedDate.toLocaleDateString()}
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-4 shadow-lg">
        <div
          className="bg-red-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2">{progress.toFixed(0)}% completed</p>
    </div>
  );
};

export default ProgressBar;
