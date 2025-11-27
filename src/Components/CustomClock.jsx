import { useState } from "react";
import { generate } from "shortid";
import ClockList from "./clockList/ClockList";
import LocalClock from "./localClock/LocalClock";

const LOCAL_CLOCK_INIT = {
  title: "My clock",
  timezone: "",
  type: "",
  offset: 0,
  date: null,
};

const CustomeClock = ()=>{
  const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
  const [clocks, setClocks] = useState([]);

  const updateLocalClock = (data) => {
    setLocalClock({
      ...localClock,
      ...data,
    });
  };

  const createNewClock = (clock) => {
    clock.id = generate();
    setClocks([...clocks, clock]);
  };

  const updateClock = (updatedClock) => {
    const mappedClocks = clocks.map((clock) => {
      if (clock.id === updatedClock.id) return updatedClock;
      return clock;
    });
    setClocks(mappedClocks);
  };

  const deleteClock = (id) => {
    const filteredClocks = clocks.filter((clock) => clock.id !== id);
    setClocks(filteredClocks);
  };

  const darkMode =true
  return (
    <div 
        
        className={`
          flex flex-col md:flex-row flex-grow 
          justify-center 
          gap-8 
          p-6 md:p-10 lg:p-12 xl:p-16 
          ${darkMode 
              ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" 
              : "bg-gray-100"
          } 
          transition-colors duration-500
        `}
      >
        <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-8">
            {/* Left - Local Clock */}
            <LocalClock
              clock={localClock}
              updateLocalClock={updateLocalClock}
              createNewClock={createNewClock}
            />

            {/* Right - Clock List */}
            <ClockList
              clocks={clocks}
              updateClock={updateClock}
              deleteClock={deleteClock}
              localClock={localClock}
            />
        </div>
       </div>
  );
}

export default CustomeClock;
