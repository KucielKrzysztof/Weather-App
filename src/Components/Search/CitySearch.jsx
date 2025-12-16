import { useCallback, useRef } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import { useCitySearch } from "../../hooks/useCitySearch";
import { useCity } from "../../context/CityContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useGeolocation } from "../../hooks/useGeolocation";

export default function CitySearch({ handleQuery, query, debouncedQuery, handleCloseSearch, isListClosed, handleSelectCity }) {
	const searchRef = useRef(null);
	const { setSelectedCity } = useCity();
	const { data: cityData, isLoading: citiesLoading, error: citiesError } = useCitySearch(debouncedQuery);

	useClickOutside(searchRef, handleCloseSearch);

	/* Callback dla sukcesu */
	const handleSuccessGeolocation = useCallback(
		({ latitude, longitude, timezone }) => {
			handleCloseSearch();
			const newCity = {
				id: "my-location",
				name: "Your location",
				country: "",
				latitude,
				longitude,
				timezone,
			};
			setSelectedCity(newCity);
		},
		[handleCloseSearch, setSelectedCity]
	);

	/* callback dla błędu */
	const handleErrorGeolocation = useCallback((error) => {
		console.error("Geolocation error:", error.message);
	}, []);

	const { getMyLocation, isLoading: geoLoading } = useGeolocation(handleSuccessGeolocation, handleErrorGeolocation);

	function handleUseMyLocation() {
		getMyLocation();
	}

	return (
		<div ref={searchRef} className="CitySearch-wrapper">
			<Search query={query} onChange={handleQuery} handleUseMyLocation={handleUseMyLocation} geoLoading={geoLoading} />

			<SearchResults
				cityRequest={{ data: cityData, error: citiesError, loading: citiesLoading }}
				isListClosed={isListClosed}
				handleSelectCity={handleSelectCity}
			/>
		</div>
	);
}
