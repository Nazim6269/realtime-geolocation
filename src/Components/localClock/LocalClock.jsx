import PropTypes from "prop-types";
import { useEffect } from "react";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockActions from "../shared/clock-actions/ClockActions";
import ClockDisplay from "../shared/clock-display/ClockDisplay";

/**
 * this component represent the local clock
 * @param {Object} props - prps object
 * @param {Object} props.clock - new created clock object
 * @param {Function} props.updateLocalClock - updateLocalClock function update the clock time
 * @param {Function} props.createNewCloc - createNewClock function create new clock
 * @returns {JSX.Element} - return the localClock component
 */
const LocalClock = ({ clock, updateLocalClock, createNewClock }) => {
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  useEffect(() => {
    updateLocalClock({ date, timezone, offset });
  }, [date]);

  return (
    <div 
  
  className="
    bg-white dark:bg-gray-800 
    flex-1 
    border border-gray-300 dark:border-gray-700 
    rounded-2xl 
    shadow-xl dark:shadow-2xl dark:shadow-black/60 
    p-7 
    transition-all duration-300
    hover:shadow-2xl dark:hover:shadow-3xl
  "
>
      {timer && (
        <ClockDisplay
          date={timer}
          timezone={timezone}
          offset={offset}
          title={clock.title}
        />
      )}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4"> 
        <ClockActions
          local={true}
          clock={clock}
          updateClock={updateLocalClock}
          createNewClock={createNewClock}
        />
      </div>
    </div>
  );
};

//defing prop types below
LocalClock.propTypes = {
  clock: PropTypes.shape({
    date: PropTypes.objectOf(PropTypes.object),
    title: PropTypes.string,
    offset: PropTypes.number,
    timezone: PropTypes.string,
    type: PropTypes.string,
  }),
  updateLocalClock: PropTypes.func,
  createNewClock: PropTypes.func,
};

export default LocalClock;
