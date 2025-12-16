import ForecastItem from "./ForecastItem";

function ForecastList({ dailyForecast }) {
	return (
		<div className="forecast-grid">
			{dailyForecast.map((day) => (
				<ForecastItem day={day} />
			))}
		</div>
	);
}

export default ForecastList;
