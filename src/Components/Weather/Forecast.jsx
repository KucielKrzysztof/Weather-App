import { normalizeForecast } from "./helpers/dataPrepare";
import ForecastList from "./ForecastList";

function Forecast({ forecastData }) {
	const dailyForecast = normalizeForecast(forecastData);

	if (dailyForecast.length === 0) return null;

	return (
		<div className="forecast-wrapper glass-effect">
			<h3 className="forecast-title">7 days forecast </h3>
			<ForecastList dailyForecast={dailyForecast} />
		</div>
	);
}

export default Forecast;
