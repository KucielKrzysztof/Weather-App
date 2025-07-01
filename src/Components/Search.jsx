export default function Search({ query, onChange }) {
	return <input className="search glass-effect" value={query} onChange={onChange} placeholder="Type city name..."></input>;
}
