const fetchQuakesData = async (api) => {
  try {
    const res = await fetch(api);
    const data = await res.json();
    return data.features || [];
  } catch {
    console.log("Failed to fetch earthquake data");
  }
};

export default fetchQuakesData;
