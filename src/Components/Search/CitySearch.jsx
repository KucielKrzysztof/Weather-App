import { useRef } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import { useCitySearch } from "../../hooks/useCitySearch";
import { useCity } from "../../context/CityContext";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function CitySearch({ handleQuery, query, debouncedQuery, handleCloseSearch, isListClosed, handleSelectCity }) {
	const searchRef = useRef(null);
	const { setSelectedCity } = useCity();
	const { data: cityData, isLoading: citiesLoading, error: citiesError } = useCitySearch(debouncedQuery);

	function handleUseMyLocation() {
		handleCloseSearch();
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				const newCity = {
					id: "my-location",
					name: "Your location",
					country: "",
					latitude,
					longitude,
					timezone: "auto", // użyj "auto" jeśli nie masz dokładnego timezone
				};
				setSelectedCity(newCity);
			},
			(error) => {
				console.error("Couldn't get the location: ", error.message);
			}
		);
	}

	/* close Search with click outside search*/
	useClickOutside(searchRef, handleCloseSearch);

	return (
		<div ref={searchRef} className="CitySearch-wrapper">
			<Search query={query} onChange={handleQuery} handleUseMyLocation={handleUseMyLocation} />

			<SearchResults
				cityRequest={{ data: cityData, error: citiesError, loading: citiesLoading }}
				isListClosed={isListClosed}
				handleSelectCity={handleSelectCity}
			/>
		</div>
	);
}
