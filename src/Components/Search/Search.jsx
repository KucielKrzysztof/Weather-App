export default function Search({ query, onChange, handleUseMyLocation, geoLoading }) {
	return (
		<div className="search-wrapper ">
			<input className="search glass-effect" value={query} onChange={onChange} placeholder="Type city name..."></input>
			<button className="btn-search" onClick={handleUseMyLocation} title="Get my localization" disabled={geoLoading}>
				{geoLoading ? "..." : "🏠︎"}
			</button>
		</div>
	);
}
