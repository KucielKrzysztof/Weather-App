import Error from "../ui/Error.jsx";
import DisplayWeather from "./DisplayWeather";
import Loading from "../ui/Loading.jsx";
import { useWeather } from "../../hooks/useWeather.js";
import Forecast from "./Forecast.jsx";

export default function Weather({ selectedCity, onClearCity }) {
	const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useWeather(selectedCity);
	const { name, country, timezone } = selectedCity;

	const { current, daily } = weatherData || {};
	const {
		time,
		temperature_2m: temperature,
		weather_code,
		wind_speed_10m: windSpeed,
		relative_humidity_2m: humidity,
		surface_pressure: pressure,
	} = current || {};

	const displayData = {
		name,
		country,
		timezone,
		temperature,
		time,
		weather_code,
		windSpeed,
		humidity,
		pressure,
		forecast: daily,
	};

	return (
		<div className="weather-card-layout">
			<div className="weather-display-box glass-effect">
				{weatherError && <Error message={weatherError} />}
				{weatherLoading && <Loading />}
				{!weatherLoading && !weatherError && <DisplayWeather onClearCity={onClearCity} data={displayData} />}
			</div>
			{daily && (
				
					<Forecast forecastData={daily} />
				
			)}
		</div>
	);
}
