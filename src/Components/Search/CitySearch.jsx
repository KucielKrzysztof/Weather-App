import { useEffect, useRef } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Error from "../Error";

export default function CitySearch({
	handleQuery,
	query,
	setCityRequest,
	setIsListClosed,
	handleCloseSearch,
	cityRequest,
	isListClosed,
	handleSelectCity,
	setSelectedCity,
}) {
	const searchRef = useRef(null);

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
	useEffect(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				handleCloseSearch();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleCloseSearch]);

	/* Fetch on query */
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
	return (
		<div ref={searchRef} className="CitySearch-wrapper">
			<Search query={query} onChange={handleQuery} handleUseMyLocation={handleUseMyLocation} />

			<SearchResults cityRequest={cityRequest} isListClosed={isListClosed} handleSelectCity={handleSelectCity} />
		</div>
	);
}
