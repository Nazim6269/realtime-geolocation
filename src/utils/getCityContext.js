export const getCityContext = async (cityName) => {
    try {
        // 1. Get Country Code for the city using Open-Meteo (Free & Keyless)
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                cityName
            )}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { country_code, country } = geoData.results[0];
        const countryCode = country_code.toLowerCase();

        // 2. Fetch Top Headlines (Keyless mirror of NewsAPI)
        // Supports: ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za
        const newsRes = await fetch(
            `https://saurav.tech/NewsAPI/top-headlines/category/general/${countryCode}.json`
        ).catch(() => null);

        let news = [];
        if (newsRes && newsRes.ok) {
            const newsData = await newsRes.json();
            news = newsData.articles.slice(0, 3); // Get Top 3
        }

        // 3. Fetch Upcoming Public Holidays
        const holidayRes = await fetch(
            `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`
        ).catch(() => null);

        let holidays = [];
        if (holidayRes && holidayRes.ok) {
            const holidayData = await holidayRes.json();
            holidays = holidayData.slice(0, 3); // Get Next 3
        }

        return {
            country,
            countryCode,
            news,
            holidays,
        };
    } catch (error) {
        console.error("Error fetching city context:", error);
        return null;
    }
};
