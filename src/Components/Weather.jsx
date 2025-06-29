import { useEffect, useState } from "react";

export default function Weather({ selectedCity }) {
	const [weatherRequest, setWeatherRequest] = useState({ data: null, error: null, loading: null });
	const { latitude, longitude, name, country, timezone } = selectedCity;

	useEffect(() => {
		const controller = new AbortController();

		async function getWeather() {
			setWeatherRequest({ data: null, error: false, loading: true });
			try {
				const res = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=${timezone}`,
					{ signal: controller.signal }
				);
				if (!res.ok) throw new Error("Something went wrong. Please try again later");
				const data = await res.json();
				setWeatherRequest({ data: data, error: false, loading: false });
			} catch (error) {
				console.log(error);
				setWeatherRequest({ data: null, error: error.message, loading: false });
			}
		}
		if (selectedCity) getWeather();
		return () => {
			controller.abort();
		};
	}, [selectedCity]);

	const { data, error, loading } = weatherRequest;
	const { current } = data || {};
	const { time, temperature_2m: temperature } = current || {};
	return (
		
		<div style={{ backgroundColor: "red" }}>
			<p>{name}</p>
			<p>{country}</p>
			<p>latitude: {latitude}</p>
			<p>longitude: {longitude}</p>
			<p>timezone: {timezone}</p>
			<p>temp: {temperature}</p>
			<p>time: {time}</p>
		</div>
	);
}
