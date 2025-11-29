import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme";

const LoadingCard = ({ text }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-xl p-5 shadow-md border animate-pulse 
        tracking-widest uppercase text-sm
        ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300 border-gray-700"
            : "bg-white text-gray-600 border-gray-200"
        }`}
    >
      {text}
    </div>
  );
};

LoadingCard.propTypes = {
  text: PropTypes.string,
};

export default LoadingCard;
