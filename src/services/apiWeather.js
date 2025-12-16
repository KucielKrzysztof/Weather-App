export async function getCityDetails(query, signal) {
	if (!query || query.length < 3) return null;

	const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`, { signal });

	if (!res.ok) throw new Error("Something went wrong with city search. Please try again.");

	const data = await res.json();
	if (!data.results) throw new Error("No results found. Try a different spelling.");

	return data.results;
}

export async function getWeatherDetails({ latitude, longitude, timezone, signal }) {
	if (!latitude || !longitude || !timezone) return null;

	const res = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=${timezone}`,
		{ signal }
	);

	if (!res.ok) throw new Error("Could not fetch weather data. Please check coordinates.");

	const data = await res.json();
	return data;
}
