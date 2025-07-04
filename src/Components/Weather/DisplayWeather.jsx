import { useEffect } from "react";
import { weatherCodesMap } from "../../assets/weatherCodes";

export default function DisplayWeather({ data, onClearCity }) {
	const { name, country, timezone, temperature, time, weather_code } = data;
	const replaceTime = time?.replace?.("T", " - ") ?? "—";

	useEffect(() => {
		console.log("i got rendered.");
	});
	return (
		<div className="weather-display">
			<div className="name">
				<strong>{name}</strong>
			</div>
			<div>{country}</div>
			<div className="temp">
				<strong>{temperature} °C</strong>
			</div>
			<div className="w-codes">
				<div style={{ fontSize: "3rem" }}>{weatherCodesMap[weather_code]?.icon || "❓"}</div>
				<div>
					<strong>{weatherCodesMap[weather_code]?.label || "Unknown weather"}</strong>
				</div>
			</div>

			<div>
				<strong>timezone:</strong> {timezone}
			</div>

			<div>
				<strong>time:</strong> {replaceTime}
			</div>
			<button className="btn-clear" onClick={onClearCity}>
				❌
			</button>
		</div>
	);
}
