export default function Weather({ data }) {
	if (!data || !data.current) return <p>No weather data yet.</p>;
	const { latitude, longitude, timezone, current } = data;
	const { time, temperature_2m: temperature } = current;
	return (
		<div>
			<p>latitude: {latitude}</p>
			<p>longitude: {longitude}</p>
			<p>timezone: {timezone}</p>
			<p>temp: {temperature}</p>
			<p>time: {time}</p>
		</div>
	);
}
