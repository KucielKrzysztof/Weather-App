import { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import CitiesList from "./Components/CitiesList";
import "./assets/styles/main.css";
import Search from "./Components/Search";
import Error from "./Components/Error";

function App() {
	const [query, setQuery] = useState("");
	const [cityRequest, setCityRequest] = useState({ data: null, error: null, loading: null });
	const [selectedCity, setSelectedCity] = useState({});
	const [isListClosed, setIsListClosed] = useState(false);

	//zapis do localstorage
	//Lokalizacja z GPS (navigator.geolocation)

	function handleQuery(event) {
		setQuery(event.target.value);
	}

	function handleSelectCity(cityObj) {
		if (!selectedCity || selectedCity.id !== cityObj.id) {
			setSelectedCity(cityObj);
			handleCloseSearch();
		}
	}
	function handleCloseSearch() {
		setIsListClosed(true);
		setCityRequest({ data: null, error: null, loading: null });
	}

	useEffect(() => {
		const controller = new AbortController();

		async function getCityDetails() {
			try {
				setIsListClosed(false);
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
		if (query === "") handleCloseSearch();
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
			<div className="box">
				<div className="background-blur "></div>
				{/* serchbar */}
				<Search query={query} onChange={handleQuery} />
				{/* od tego momentu renderowanie lsity */}
				{cityRequest.loading && <div className="city-list glass-effect">Loading...</div>}
				{cityRequest.error && <Error message={cityRequest.error} />}
				{cityRequest.data && !isListClosed && <CitiesList cities={cityRequest.data} onSelectCity={handleSelectCity} />}
				{/* od tego momentu renderowanie Pogody */}
				{selectedCity?.id && <Weather selectedCity={selectedCity} />}
			</div>
		</>
	);
}

export default App;
