import { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import CitiesList from "./Components/CitiesList";

function App() {
	const [query, setQuery] = useState("");
	const [cities, setCities] = useState(null);
	const [data, setData] = useState(null);
	//selected city obj, jesli selected to wysylasz request i renderujesz komponent danego miasta
	//zapis do localstorage
	//Lokalizacja z GPS (navigator.geolocation)

	function handleChange(event) {
		setQuery(event.target.value);
	}

	async function getCityDetails() {
		const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
		const data = await res.json();
		setCities(data.results);
	}

	async function getWeather() {
		const res = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&current=temperature_2m&timezone=Europe%2FMoscow`
		);
		const data = await res.json();
		console.log(data);
		setData(data);
	}

	useEffect(() => {
		console.log(cities);
	}, [cities]);

	return (
		<>
			<div>
				<input value={query} onChange={handleChange}></input>
				<p>
					<button onClick={getCityDetails}>Get city details</button>
				</p>
				<button onClick={getWeather}>Click me</button>
				{data ? <Weather data={data} /> : <p>NO DATA YET</p>}

				{cities && <CitiesList cities={cities} />}
			</div>
		</>
	);
}

export default App;
