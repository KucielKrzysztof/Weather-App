import { weatherCodesMap } from "../../assets/weatherCodes";

function ForecastItem({ day }) {
	return (
		<div key={day.dayLabel} className="forecast-item">
			<small className="day-label">{day.dayLabel}</small>
			<div className="weather-icon-small">{weatherCodesMap[day.weatherCode]?.icon || "❓"}</div>
			<div className="temps">
				<strong className="temp-max">{day.tempMax}°</strong>
				<span className="temp-min">{day.tempMin}°</span>
			</div>
		</div>
	);
}

export default ForecastItem;
