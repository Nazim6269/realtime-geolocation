import PropTypes from "prop-types";
import ClockListItem from "./ClockListItem";

/**
 * clock list component will render the list of created clocks
 * @param {Object} props - The component props.
 * @param {Array} props.clocks - clocks is array of clock object
 * @param {Function} props.updateClock - update clock is a function
 * @param {Function} props.deleteClock - delete clock is a function
 * @param {Object} props.localClock - local is an object
 * @returns {JSX.Element} - A JSX element representing Clock list
 */
const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
  return (
   <div 
  className="
    bg-white dark:bg-gray-900 
    shadow-2xl dark:shadow-black/70 
    border border-gray-200 dark:border-gray-700
    rounded-2xl 
    p-7 
    w-full 
    md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto 
    transition-colors duration-500
  "
>
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 
                      bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
        Other Clocks
      </h3>
      <hr className="border-t border-gray-300 dark:border-gray-700 mb-6" /> 
      
      {clocks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          There are no other clocks added. Please use the Add New Clock button to track a new timezone.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {clocks.map((clock) => (
            <ClockListItem
              key={clock.id}
              clock={clock}
              updateClock={updateClock}
              deleteClock={deleteClock}
              localClock={localClock.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

//defining prop types below
ClockList.propTypes = {
  clocks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      timezone: PropTypes.string,
      offset: PropTypes.number,
    })
  ),
  updateClock: PropTypes.func,
  deleteClock: PropTypes.func,
  localClock: PropTypes.shape({
    title: PropTypes.string,
    offset: PropTypes.number,
    timezone: PropTypes.string,
    type: PropTypes.string,
    date:PropTypes.string
  }),
};

export default ClockList;
