import { weatherCodesMap } from "../../assets/weatherCodes";
import { formatTime } from "./helpers/formatters";

export default function DisplayWeather({ data, onClearCity }) {
	const { name, country, timezone, temperature, time, weather_code, windSpeed, humidity, pressure } = data;

	const apiTime = formatTime(time, timezone);

	return (
		<div className="weather-display">
			<div className="header-row">
				<h2 className="location-name">{name}</h2>
				<button className="btn-clear" onClick={onClearCity} title="Clear city and search again">
					✕
				</button>
			</div>
			<div className="country-name">{country}</div>

			<div className="main-weather-info">
				<div className="temp-large">
					<strong>{temperature} °C</strong>
				</div>

				<div className="w-codes-main">
					<div className="weather-icon-large">{weatherCodesMap[weather_code]?.icon || "❓"}</div>
					<div className="weather-description">{weatherCodesMap[weather_code]?.label || "Unknown weather"}</div>
				</div>
			</div>

			<div className="details-wrapper">
				<div className="details glass-effect">
					<div className="detail-item ">
						<small>Timezone: </small>
						<strong>{timezone}</strong>
					</div>

					<div className="detail-item ">
						<small>Data from: </small>
						<strong>{apiTime}</strong>
					</div>

					<div className="detail-item ">
						<small>Wind Speed: </small>
						<strong>{Math.round(windSpeed)} km/h</strong>
					</div>

					<div className="detail-item ">
						<small>Humidity: </small>
						<strong>{humidity}%</strong>
					</div>

					<div className="detail-item ">
						<small>Pressure: </small>
						<strong>{pressure} hPa</strong>
					</div>
				</div>
			</div>
		</div>
	);
}
