import React, { useEffect, useState } from "react"; // React Imports.
import { getDatabase, ref, onValue, /*set*/ } from "firebase/database"; // Firebase Imports.
import db from "./configuration"; // Importing Firebase config.

function TrafficTally() {
  const [cars, setCars] = useState({
    cars: 0,
    trucks: 0,
    motorcycles: 0,
    heavy_trucks: 0,
    tractors: 0,
    buses: 0,
  });

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
  // const storeCarData = () => {
  //   const database = getDatabase(db);
  //   set(ref(database, "trafficTally"), cars)
  //     .then(() => alert("Car count saved successfully! 🚦"))
  //     .catch((error) => console.error("Error saving car data:", error));
  // };

  const leftColumn = ["cars", "motorcycles", "buses"];
  const rightColumn = ["trucks", "heavy_trucks", "tractors"];

  const formatLabel = (str) =>
    str
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const renderCounter = (type) => {

    let imageSrc;
    try {
      imageSrc = require(`./img/${type}.png`);
    } catch (e) {
      imageSrc = null; // fallback if image doesn't exist
    }

    return (
      <div
        key={type}
        className="bg-gradient-to-r from-gray-700 to-gray-800 shadow-xl rounded-2xl p-6 text-center w-72 mb-6 border-2 border-transparent hover:border-white transition-all duration-300"
      >

        <div className="flex items-center justify-center gap-2">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={type}
              className="w-8 h-8 rounded"
            />
          )}
          <h2 className="text-2xl font-bold text-white">{formatLabel(type)}</h2>
        </div>

        <p className="text-6xl font-extrabold text-yellow-300 my-4">{cars[type]}</p>

        <div className="flex justify-center gap-3">
          {/* Decrement button */}
          <button
            onClick={() => updateCarCount(type, -1)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            -1
          </button>

          {/* Increment buttons */}
          <button
            onClick={() => updateCarCount(type, 1)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            +1
          </button>
          <button
            onClick={() => updateCarCount(type, 2)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            +2
          </button>
          <button
            onClick={() => updateCarCount(type, 5)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            +5
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center my-6">
        TrafficTally: Vehicle Counter
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          {leftColumn.map(renderCounter)}
        </div>
        <div className="flex flex-col items-center">
          {rightColumn.map(renderCounter)}
        </div>
      </div>

      {/* <button
        onClick={storeCarData}
        className="mb-5 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
      >
        📊 Save Counts
      </button> */}
    </div>
  );
}

export default TrafficTally;
