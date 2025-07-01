import { weatherCodesMap } from "../assets/weatherCodes";

export default function DisplayWeather({ data }) {
	const { name, country, timezone, temperature, time, weather_code } = data;
	return (
		<div className="weather-display">
			<p className="name">
				<strong>{name}</strong>
			</p>
			<p>{country}</p>
			<p className="temp">
				<strong>{temperature} °C</strong>
			</p>
			<p className="w-codes">
				<p style={{ fontSize: "3rem" }}>{weatherCodesMap[weather_code]?.icon || "❓"}</p>
				<p>
					<strong>{weatherCodesMap[weather_code]?.label || "Unknown weather"}</strong>
				</p>
			</p>

			<p>timezone: {timezone}</p>

			<p>time: {time}</p>
		</div>
	);
}
