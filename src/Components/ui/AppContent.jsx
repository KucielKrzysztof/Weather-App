import { useState } from "react";
import Weather from "../Weather/Weather";
import CitySearch from "../Search/CitySearch";
import DisplayStart from "../Weather/DisplayStart";
import { useDebounce } from "../../hooks/useDebounce";
import { useCity } from "../../context/CityContext";
import { useEscape } from "../../hooks/useEscape";

function AppContent() {
	const { selectedCity, setSelectedCity, clearCity } = useCity();
	const [query, setQuery] = useState("");
	const [isListClosed, setIsListClosed] = useState(false);
	const debouncedQuery = useDebounce(query, 500);

	function handleQuery(event) {
		setIsListClosed(false);
		setQuery(event.target.value);
	}

	function handleCloseSearch() {
		setIsListClosed(true);
		setQuery("");
	}

	function handleSelectCity(cityObj) {
		if (!selectedCity || selectedCity.id !== cityObj.id) {
			setSelectedCity(cityObj);
			handleCloseSearch();
		}
	}

	useEscape(handleCloseSearch);

	return (
		<>
			<CitySearch
				handleQuery={handleQuery}
				debouncedQuery={debouncedQuery}
				query={query}
				setIsListClosed={setIsListClosed}
				handleCloseSearch={handleCloseSearch}
				isListClosed={isListClosed}
				handleSelectCity={handleSelectCity}
			/>

			{selectedCity?.id ? <Weather selectedCity={selectedCity} onClearCity={clearCity} /> : <DisplayStart />}
		</>
	);
}

export default AppContent;
