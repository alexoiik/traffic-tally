import React, { useEffect, useState } from "react"; // React Imports.
import { getDatabase, ref, onValue, set } from "firebase/database"; // Firebase Imports.
import db from "./configuration"; // Importing Firebase config.

function TrafficTally() {
  const [cars, setCars] = useState({ cars: 0, trucks: 0, motorcycles: 0 });

  useEffect(() => {
    const database = getDatabase(db);
    const carsRef = ref(database, "trafficTally");

    // Fetching the latest car count from Firebase.
    onValue(carsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCars(data); // Updating state with Firebase data.
      }
    });
  }, []);

  // Function to update car count locally.
  const updateCarCount = (type, value) => {
    setCars((prev) => ({ ...prev, [type]: Math.max(0, prev[type] + value) })); // Prevents negative numbers.
  };

  // Storing updated counts in Firebase.
  const storeCarData = () => {
    const database = getDatabase(db);
    set(ref(database, "trafficTally"), cars)
      .then(() => alert("Car count saved successfully! 🚦"))
      .catch((error) => console.error("Error saving car data:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center my-6">
        TrafficTally: Road Car Counter
      </h1>

      {/* Car Counters */}
      {Object.keys(cars).map((type) => (
        <div
          key={type}
          className="bg-gradient-to-r from-gray-700 to-gray-800 shadow-xl rounded-2xl p-6 text-center w-80 mb-6 border-2 border-transparent hover:border-white transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-white">{type.toUpperCase()}</h2>
          <p className="text-6xl font-extrabold text-yellow-300 my-4">{cars[type]}</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => updateCarCount(type, -1)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              -1
            </button>
            <button
              onClick={() => updateCarCount(type, 1)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              +1
            </button>
          </div>
        </div>
      ))}

      {/* Store Data Button */}
      <button
        onClick={storeCarData}
        className="text-lg mb-6 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-bold py-4 px-14 sm:py-3 sm:px-6 md:py-4 md:px-10 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
      >
        📊 Store Data
      </button>
    </div>
  );
}

export default TrafficTally;
