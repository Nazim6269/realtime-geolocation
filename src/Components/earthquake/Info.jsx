import { useTheme } from "../../hooks/useTheme";

const InfoRow = ({ label, value, mono, highlight }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="flex justify-between">
      <span className="opacity-60">{label}</span>
      <span
        className={`font-semibold ${mono ? "font-mono" : ""} ${
          highlight || ""
        } ${isDark ? "text-darkTextColor" : "text-lightTextColor"}`}
      >
        {value}
      </span>
    </div>
  );
};

export default InfoRow;
