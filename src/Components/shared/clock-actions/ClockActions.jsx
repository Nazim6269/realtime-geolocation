import PropTypes from "prop-types";
import { useState } from "react";
import ClockForm from "../clock-form/ClockForm";

/**
 * Functional component for managing clock actions.
 * @param {Object} props - The component props.
 * @param {boolean} [props.local=false] - Indicates if the clock is local.
 * @param {Object} props.clock - The clock object.
 * @param {Function} props.updateClock - Function to update the clock.
 * @param {Function} props.createNewClock - Function to create a new clock.
 * @param {Function} props.deleteClock - Function to delete the clock.
 * @returns {JSX.Element} ClockActions component.
 */
const ClockActions = ({
  local = false,
  clock,
  updateClock,
  createNewClock,
  deleteClock,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  /**
   * Handles clock action.
   * @param {Object} value - Value to handle.
   * @returns {void}
   */
  const handleClock = (value) => {
    createNewClock(value);
  };

  return (
    <div 
  className="
    bg-gray-50 dark:bg-gray-900 
    border border-gray-200 dark:border-gray-800 
    shadow-lg dark:shadow-black/50 
    rounded-lg 
    py-4 px-4 
    space-y-4 
    max-w-full mx-auto 
    transition-colors duration-300
  "
>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        {/* UPDATE Button */}
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="
            flex-1 
            bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 
            text-white font-semibold 
            py-2 px-4 
            rounded-md 
            shadow-md hover:shadow-lg transition-all duration-300
          "
        >
          {isEdit ? 'Close Edit' : 'Update'}
        </button>

        {/* Conditional Action Button: Add or Delete */}
        {local ? (
          // ADD Button
          <button
            onClick={() => setIsCreate(!isCreate)}
            className="
              flex-1 
              bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 
              text-white font-semibold 
              py-2 px-4 
              rounded-md 
              shadow-md hover:shadow-lg transition-all duration-300
            "
          >
            {isCreate ? 'Close Add' : 'Add New Clock'}
          </button>
        ) : (
          // DELETE Button
          <button
            onClick={() => deleteClock(clock.id)}
            className="
              flex-1 
              bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 
              text-white font-semibold 
              py-2 px-4 
              rounded-md 
              shadow-md hover:shadow-lg transition-all duration-300
            "
          >
            Delete
          </button>
        )}
      </div>

      {/* Edit Clock Form Container */}
      {isEdit && (
        <div className="mt-4 p-5 border border-blue-400 dark:border-blue-700 bg-white dark:bg-gray-800 rounded-lg shadow-inner transition-colors duration-300">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            Edit Clock
          </h3>
          <ClockForm
            handleClock={updateClock}
            title={!local}
            values={clock}
            edit={true}
          />
        </div>
      )}

      {/* Create Clock Form Container */}
      {isCreate && (
        <div className="mt-4 p-5 border border-teal-400 dark:border-teal-700 bg-white dark:bg-gray-800 rounded-lg shadow-inner transition-colors duration-300">
          <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">
            Create Clock
          </h3>
          <ClockForm handleClock={handleClock} />
        </div>
      )}
    </div>
  );
};

//defining prop types below
ClockActions.propTypes = {
  updateClock: PropTypes.func,
  createNewClock: PropTypes.func,
  deleteClock: PropTypes.func,
  clock: PropTypes.shape({
    date: PropTypes.objectOf(PropTypes.object),
    title: PropTypes.string,
    offset: PropTypes.number,
    type: PropTypes.string,
    id:PropTypes.string
  }),
  local: PropTypes.bool,
};

export default ClockActions;
