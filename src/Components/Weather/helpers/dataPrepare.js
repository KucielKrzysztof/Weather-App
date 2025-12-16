// Funkcja do normalizacji danych kolumnowych na tablicę obiektów (JEDEN OBIEKT = JEDEN DZIEŃ)
export function normalizeForecast(rawForecast) {
	if (!rawForecast || !rawForecast.time) return [];

	const { time, temperature_2m_max, temperature_2m_min, weather_code } = rawForecast;

	// Tworzy array [0, 1, 2, 3, 4, 5, 6] (7 dni)
	return time.map((dayTime, index) => {
		const date = new Date(dayTime);

		return {
			dayLabel: date.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" }),
			tempMax: Math.round(temperature_2m_max[index]),
			tempMin: Math.round(temperature_2m_min[index]),
			weatherCode: weather_code[index],
		};
	});
}
