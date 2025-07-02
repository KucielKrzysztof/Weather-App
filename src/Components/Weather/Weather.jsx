import { useEffect, useState } from "react";
import Error from "../Error";
import DisplayWeather from "./DisplayWeather";
import Loading from "../Loading.jsx";

export default function Weather({ selectedCity, onClearCity }) {
	const [weatherRequest, setWeatherRequest] = useState({ data: null, error: null, loading: null });
	const { latitude, longitude, name, country, timezone } = selectedCity;

	useEffect(() => {
		const controller = new AbortController();

		async function getWeather() {
			setWeatherRequest({ data: null, error: false, loading: true });
			try {
				const res = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=${timezone}`,
					{ signal: controller.signal }
				);
				if (!res.ok) throw new Error("Something went wrong. Please try again later");
				const data = await res.json();
				setWeatherRequest({ data: data, error: false, loading: false });
			} catch (error) {
				console.log(error);
				if (error.name === "AbortError") {
					return;
				}
				setWeatherRequest({ data: null, error: error.message, loading: false });
			}
		}
		if (selectedCity) getWeather();
		return () => {
			controller.abort();
		};
	}, [selectedCity, latitude, longitude, timezone]);

	const { data, error, loading } = weatherRequest;
	const { current } = data || {};
	const { time, temperature_2m: temperature, weather_code } = current || {};
	return (
		<div className="weather-display-box glass-effect">
			{error && <Error message={error} />}
			{loading && <Loading />}
			{!loading && !error && (
				<DisplayWeather onClearCity={onClearCity} data={{ name, country, latitude, longitude, timezone, temperature, time, weather_code }} />
			)}
		</div>
	);
}
