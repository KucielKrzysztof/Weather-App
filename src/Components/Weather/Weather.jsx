import Error from "../Error";
import DisplayWeather from "./DisplayWeather";
import Loading from "../Loading.jsx";
import { useWeather } from "../../hooks/useWeather.js";

export default function Weather({ selectedCity, onClearCity }) {
	const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useWeather(selectedCity);
	const { name, country, timezone } = selectedCity;

	const { current } = weatherData || {};
	const { time, temperature_2m: temperature, weather_code } = current || {};

	const displayData = {
		name,
		country,
		timezone,
		temperature,
		time,
		weather_code,
	};

	return (
		<div className="weather-display-box glass-effect">
			{weatherError && <Error message={weatherError} />}
			{weatherLoading && <Loading />}
			{!weatherLoading && !weatherError && <DisplayWeather onClearCity={onClearCity} data={displayData} />}
		</div>
	);
}
