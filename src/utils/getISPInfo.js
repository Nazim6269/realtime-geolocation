export const getISPInfo = async () => {
   // List of reliable HTTPS-supported APIs with fallback mechanism
   const apis = [
      {
         url: "https://ipwho.is/",
         parser: (data) => ({
            ip: data.ip,
            type: data.type,
            continent: data.continent,
            country: data.country,
            region: data.region,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            postal: data.postal,
            flag: data.flag?.emoji,
            connection: {
               isp: data.connection?.isp,
               org: data.connection?.org,
               asn: data.connection?.asn,
            },
         }),
      },
      {
         url: "https://freeipapi.com/api/json",
         parser: (data) => ({
            ip: data.ipAddress,
            type: data.ipVersion === 4 ? "IPv4" : "IPv6",
            continent: data.continentName,
            country: data.countryName,
            region: data.regionName,
            city: data.cityName,
            latitude: data.latitude,
            longitude: data.longitude,
            postal: data.zipCode,
            flag: "", // Not provided
            connection: {
               isp: "Unknown",
               org: "Unknown",
            },
         }),
      },
      {
         url: "https://ipapi.co/json/",
         parser: (data) => ({
            ip: data.ip,
            type: data.version,
            continent: data.continent_code,
            country: data.country_name,
            region: data.region,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            postal: data.postal,
            flag: "", // Not provided
            connection: {
               isp: data.org,
               org: data.org,
               asn: data.asn,
            },
         }),
      },
   ];

   for (const api of apis) {
      try {
         const controller = new AbortController();
         const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

         const res = await fetch(api.url, { signal: controller.signal });
         clearTimeout(timeoutId);

         if (!res.ok) continue;

         const data = await res.json();

         // Basic validation to ensure we got a valid response
         if (data && (data.ip || data.ipAddress)) {
            return api.parser(data);
         }
      } catch (error) {
         console.warn(`Failed to fetch from ${api.url}, trying fallback...`, error.message);
      }
   }

   return null;
};
