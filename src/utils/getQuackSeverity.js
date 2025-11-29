export const getQuackSeverity = (mag) => {
  if (mag >= 6) return { label: "SEVERE", color: "bg-red-500/20 text-red-400" };
  if (mag >= 4.5)
    return { label: "MODERATE", color: "bg-yellow-500/20 text-yellow-400" };
  return { label: "LOW", color: "bg-green-500/20 text-green-400" };
};
