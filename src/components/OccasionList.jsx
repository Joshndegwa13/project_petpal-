import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";
import OccasionCard from "./OccasionCard";

function OccasionList() {
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    const occasionRef = ref(database, "occasions");
    onValue(occasionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const occasionList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOccasions(occasionList);
      }
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h2 className="text-3xl font-semibold mb-6">Treatment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {occasions.map((occasion) => (
          <OccasionCard key={occasion.id} occasion={occasion} />
        ))}
      </div>
    </div>
  );
}

export default OccasionList;
