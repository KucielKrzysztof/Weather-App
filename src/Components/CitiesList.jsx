import City from "./City";
export default function CitiesList({ cities, onSelectCity }) {
	return (
		<div className="city-list glass-effect">
			<ul>
				{cities.map((city) => (
					<City key={city.id} cityObj={city} onSelectCity={onSelectCity}></City>
				))}
			</ul>
		</div>
	);
}
