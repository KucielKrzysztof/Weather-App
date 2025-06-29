import { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import CitiesList from "./Components/CitiesList";

function App() {
	const [query, setQuery] = useState("");
	const [cityRequest, setCityRequest] = useState({ data: null, error: null, loading: null });

	const [selectedCity, setSelectedCity] = useState({});

	/* const [cities, setCities] = useState(null);
	const [data, setData] = useState(null); */
	//selected city obj, jesli selected to wysylasz request i renderujesz komponent danego miasta
	//zapis do localstorage
	//Lokalizacja z GPS (navigator.geolocation)

	function handleQuery(event) {
		setQuery(event.target.value);
	}

	function handleSelectCity(cityObj) {
		if (selectedCity.id !== cityObj.id) setSelectedCity(cityObj);
	}

	useEffect(() => {
		const controller = new AbortController();

		async function getCityDetails() {
			try {
				setCityRequest({ data: null, error: null, loading: true });

				const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`, { signal: controller.signal });
				if (!res.ok) throw new Error("Something went wrong. Please try again later");
				const data = await res.json();
				if (!data.results) throw new Error("No results");
				setCityRequest({ data: data.results, error: false, loading: false });
			} catch (error) {
				console.log(error);
				setCityRequest({ data: null, error: error.message, loading: false });
			}
		}
		if (query.length < 3) return;
		getCityDetails();

		return () => {
			controller.abort();
		};
	}, [query]);

	useEffect(() => {
		console.log(cityRequest.data);
	}, [cityRequest.data]);

	return (
		<>
			<div>
				<input value={query} onChange={handleQuery}></input>

				{cityRequest.loading && <div>Loading...</div>}
				{cityRequest.error && <div>{cityRequest.error}</div>}
				{cityRequest.data && <CitiesList cities={cityRequest.data} onSelectCity={handleSelectCity} />}
				{selectedCity?.id && <Weather selectedCity={selectedCity} />}
			</div>
		</>
	);
}

export default App;
