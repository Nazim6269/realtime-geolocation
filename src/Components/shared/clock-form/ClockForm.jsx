import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { TIMEZONE_OFFSET } from "../../../constants/timezone";
import { getOffset } from "../../../utils/timezone";

/**
 * this component is used to crate clock form
 * @param {Object} props
 * @param {Object} props.values - values object with title, timezone and offset property
 * @param {Function} props.handleClock - handleClock funciton acts for state lifting
 * @param {String | boolean} props.title
 * @param {boolean} props.edit
 * @returns {JSX.Element}
 */
const ClockForm = ({
  values = { title: "", timezone: "GMT", offset: 0 },
  handleClock,
  title = true,
  edit = false,
}) => {
  const [formValues, setFormValues] = useState({ ...values });

  //handleChange function
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "offset") {
      value = Number(value) * 60;
    }
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClock(formValues);
  };

  useEffect(() => {
    if (TIMEZONE_OFFSET[formValues.timezone]) {
      setFormValues((prev) => ({
        ...prev,
        offset: TIMEZONE_OFFSET[formValues.timezone],
      }));
    }
  }, [formValues.timezone]);

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-800 
        shadow-2xl dark:shadow-black/70 
        border border-gray-200 dark:border-gray-700
        rounded-xl 
        p-6 md:p-8 
        max-w-lg mx-auto 
        space-y-6 
        transition-colors duration-300
      "
    >
      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
        >
          Enter Your Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          disabled={!title}
          onChange={handleChange}
          className="
            w-full p-3 
            border border-gray-300 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white 
            bg-gray-50 dark:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-teal-400 
            transition-colors duration-200
            disabled:bg-gray-200 dark:disabled:bg-gray-900
          "
        />
      </div>

      {/* Timezone Select */}
      <div>
        <label
          htmlFor="timezone"
          className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
        >
          Enter Your Timezone
        </label>
        <select
          id="timezone"
          name="timezone"
          value={formValues.timezone}
          onChange={handleChange}
          className="
            w-full p-3 
            border border-gray-300 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white 
            bg-gray-50 dark:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-teal-400 
            transition-colors duration-200
          "
        >
          <option value="UTC">UTC</option>
          <option value="GMT">GMT</option>
          <option value="PST">PST</option>
          <option value="EDT">EDT</option>
          <option value="BST">BST</option>
          <option value="MST">MST</option>
        </select>
      </div>

      {/* Offset Select (Conditional) */}
      {(formValues.timezone === "GMT" || formValues.timezone === "UTC") && (
        <div>
          <label
            htmlFor="offset"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
          >
            Enter Your Offset (Hours)
          </label>
          <select
            name="offset"
            value={formValues.offset / 60}
            onChange={handleChange}
            className="
              w-full p-3 
              border border-gray-300 dark:border-gray-700 
              rounded-lg 
              text-gray-900 dark:text-white 
              bg-gray-50 dark:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-teal-400 
              transition-colors duration-200
            "
          >
            {getOffset().map((item) => (
              <option key={item} value={item}>
                {item >= 0 ? `GMT+${item}` : `GMT${item}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Submit Button*/}
      <button
        type="submit"
        className="
          w-full 
          bg-gradient-to-r from-blue-600 to-teal-500 
          text-white 
          font-bold 
          py-3 
          rounded-xl 
          shadow-lg hover:shadow-xl transition-all duration-300 
          hover:brightness-110
        "
      >
        {edit ? "Update Clock" : "Create Clock"}
      </button>
    </form>
  );
};

//defining prop types below
ClockForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    timezone: PropTypes.string,
    offset: PropTypes.number,
  }),
  handleClock: PropTypes.func,
  title: PropTypes.string || PropTypes.bool,
  edit: PropTypes.bool,
};

export default ClockForm;
