import { useEffect, useState } from "react";
import Weather from "./Components/Weather/Weather";
import "./assets/styles/main.css";
import CitySearch from "./Components/Search/CitySearch";
import DisplayStart from "./Components/Weather/DisplayStart";

function App() {
	const [query, setQuery] = useState("");
	const [cityRequest, setCityRequest] = useState({ data: null, error: null, loading: null });
	const [selectedCity, setSelectedCity] = useState(() => {
		const saved = localStorage.getItem("selectedCity");
		return saved ? JSON.parse(saved) : null;
	});
	const [isListClosed, setIsListClosed] = useState(false);

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

	function clearCity() {
		setSelectedCity(null);
		setQuery("");
		localStorage.removeItem("selectedCity");
	}

	/* SAVE to localstorage */
	useEffect(() => {
		if (selectedCity) {
			localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
		}
	}, [selectedCity]);

	/* Close Search with ESC key */
	useEffect(() => {
		function closeWithEscape(event) {
			if (event.code === "Escape") {
				console.log(event.code);
				handleCloseSearch();
			}
		}
		document.addEventListener("keydown", closeWithEscape);
		return () => {
			document.removeEventListener("keydown", closeWithEscape);
		};
	}, [handleCloseSearch]);

	return (
		<>
			<div className="background-blur" />
			<div className="box">
				<CitySearch
					handleQuery={handleQuery}
					query={query}
					setCityRequest={setCityRequest}
					setIsListClosed={setIsListClosed}
					handleCloseSearch={handleCloseSearch}
					cityRequest={cityRequest}
					isListClosed={isListClosed}
					handleSelectCity={handleSelectCity}
					setSelectedCity={setSelectedCity}
				/>

				{selectedCity?.id ? <Weather selectedCity={selectedCity} onClearCity={clearCity} /> : <DisplayStart />}
			</div>
		</>
	);
}

export default App;
