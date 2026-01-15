import { useState, useMemo } from "react";
import Select from "react-select";
import { getTimeZones } from "@vvo/tzdb";
import { useTheme } from "../hooks/useTheme";

const AddNew = ({ onAdd }) => {
  const [selected, setSelected] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Prepare timezone options once
  const timezoneOptions = useMemo(() => {
    return getTimeZones({ includeUtc: true }).map((tz) => {
      const fallbackCity = tz.name.split("/").pop().replace(/_/g, " ");

      return {
        value: tz.name, // e.g. "Asia/Dhaka"
        label:
          tz.group ||
          `${tz.name.replace(/_/g, " ")} (${tz.abbreviation})`,
        city: tz.mainCities?.[0] || fallbackCity,
        offset: tz.offset,
      };
    });
  }, []);

  const handleAdd = () => {
    if (!selected) return;

    onAdd({
      id: Date.now() + Math.random(),
      city: selected.city,
      timezone: selected.value,
    });

    setSelected(null);
  };

  // react-select styles for dark/light theme
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "#f9fafb",
      borderColor: isDark ? "#4b5563" : "#d1d5db",
      color: isDark ? "#f3f4f6" : "#111827",
      boxShadow: "none",
      "&:hover": { borderColor: isDark ? "#6b7280" : "#9ca3af" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDark
          ? "#4f46e5"
          : "#6366f1"
        : state.isFocused
        ? isDark
          ? "#374151"
          : "#f3f4f6"
        : "transparent",
      color: isDark ? "#f3f4f6" : "#111827",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#f3f4f6" : "#111827",
    }),
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1 min-w-[280px] md:min-w-[360px]">
        <label
          className={`block mb-1.5 text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Add city / timezone
        </label>

        <Select
          value={selected}
          onChange={setSelected}
          options={timezoneOptions}
          placeholder="Search for a city or timezone..."
          isSearchable
          styles={customStyles}
          noOptionsMessage={() => "No timezone found"}
          formatOptionLabel={(option) => (
            <div>
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-gray-500 ml-2">
                ({option.value})
              </span>
            </div>
          )}
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={!selected}
        className={`
          px-6 py-3 rounded-xl font-semibold text-white
          shadow-md hover:shadow-lg hover:brightness-110
          transition-all duration-300 min-w-[120px]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            isDark
              ? "bg-gradient-to-r from-blue-600 to-teal-600"
              : "bg-gradient-to-r from-indigo-500 to-purple-600"
          }
        `}
      >
        Add Clock
      </button>
    </div>
  );
};

export default AddNew;
