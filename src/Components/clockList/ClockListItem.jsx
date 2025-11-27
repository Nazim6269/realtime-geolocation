import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

/**
 * @param {Object} props - The component props.
 * @param {Object} props.clock - represent the created date object
 * @param {Function} props.updateClock - update clock is a function
 * @param {Function} props.deleteClock - delete clock is a function
 * @param {Object} props.localClock - local is an object
 * @returns {JSX.Element} -return a jsx element represent a sing clock list item
 */

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;
  return (
    <div 
  
  className="
    bg-white dark:bg-gray-900 
    border border-gray-200 dark:border-gray-700 
    rounded-xl 
    shadow-lg shadow-gray-300/50 dark:shadow-black/70 
    p-5 
    mx-auto 
    space-y-4 
    transition-all duration-300 
    hover:shadow-2xl hover:scale-[1.02]
  "
>
      <ClockDisplay
        date={timer}
        timezone={clock.timezone}
        offset={clock.offset}
        title={clock.title}
        titleClass="text-xl font-bold mb-1 text-gray-800 dark:text-white"
        timeClass="text-3xl font-mono text-blue-600 dark:text-teal-400"
        dateClass="text-sm text-gray-600 dark:text-gray-400"
      />
      
      {/* Distance Display */}
      <h3 className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-3">
        {formatDistance(localClock, timer)}
      </h3>
      
      {/* Clock Actions */}
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        deleteClock={deleteClock}
        size="small" 
      />
    </div>
  );
};

//defining prop types below
ClockListItem.propTypes = {
  clock: PropTypes.shape({
    title: PropTypes.string,
    timezone: PropTypes.string,
    offset: PropTypes.number,
    id: PropTypes.string,
  }),
  updateClock: PropTypes.func,
  deleteClock: PropTypes.func,
  localClock: PropTypes.object,
};

export default ClockListItem;
