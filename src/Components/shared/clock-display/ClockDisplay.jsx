import { format } from "date-fns";
import PropTypes from "prop-types";

/**
 * ClockDisplay component displays a clock with given date, timezone, offset, and title.
 * @param {Object} props - The props object containing date, timezone, offset, and title.
 * @param {Date} props.date - The date object representing the current date and time.
 * @param {string} props.timezone - The timezone string representing the timezone of the clock.
 * @param {number} props.offset - The offset representing the time difference from UTC in minutes.
 * @param {string} props.title - The title of the clock.
 * @returns {JSX.Element} A JSX element representing the ClockDisplay component.
 */

const ClockDisplay = ({ date, timezone, offset, title }) => {
  let offsetHr = offset / 60;
  return (
    <div 
  className="
    bg-white dark:bg-gray-900 
    rounded-lg 
    p-4 md:p-6 
    max-w-full mx-auto 
    space-y-1 
    transition-colors duration-300
  "
>
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-1 
                     text-gray-800 dark:text-white">
          {title}
      </h1>

      {/* Formatted Time/Date */}
      <h2 className="text-3xl md:text-4xl font-mono font-medium text-blue-600 dark:text-teal-400">
        {/* Assuming 'format' function is provided externally and formats time correctly */}
        {format(date, "yyy-MM-dd hh:mm:ss aaaa")}
      </h2>

      {/* Timezone and Offset */}
      <h3 className="text-sm md:text-base text-gray-500 dark:text-gray-400 pt-1">
        <span className="font-semibold text-gray-600 dark:text-gray-300">{timezone}</span>
        {' '}
        {/* Adjusting the offset display */}
        (<span className="font-mono">{offsetHr >= 0 ? `GMT+${Math.abs(offsetHr)}` : `GMT-${Math.abs(offsetHr)}`}</span>)
      </h3>
    </div>
  );
};

ClockDisplay.propTypes = {
  date: PropTypes.object,
  timezone: PropTypes.string,
  offset: PropTypes.number,
  title: PropTypes.string,
};

export default ClockDisplay;
