import CitiesList from "./CitiesList";
import Error from "../Error";

export default function SearchResults({ cityRequest, handleSelectCity, isListClosed }) {
	return (
		<>
			{cityRequest.loading && <div className="city-list glass-effect">Loading...</div>}
			{cityRequest.error && <Error message={cityRequest.error} />}
			{cityRequest.data && !isListClosed && <CitiesList cities={cityRequest.data} onSelectCity={handleSelectCity} />}
		</>
	);
}
