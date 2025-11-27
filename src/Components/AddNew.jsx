import { useState } from "react";
import { initialClocks } from "../../data";


const AddNew = () => {
    const [clocks, setClocks] = useState(initialClocks);
     const [newCity, setNewCity] = useState("");
     const addCity = () => {
    if (newCity.trim()) {
      const id = clocks.length + 1;
      setClocks([...clocks, { id, city: newCity, timezone: newCity }]);
      setNewCity("");
    }
  };
  return (
    <div className="mb-8 flex gap-4">
      <input
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        placeholder="Enter city / timezone"
        className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-80 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-inner transition-colors"
      />
      <button
        onClick={addCity}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300"
      >
        Add City
      </button>
    </div>
  )
}

export default AddNew