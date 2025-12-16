import City from "./City";
export default function CitiesList({ cities, onSelectCity }) {
	return (
		<div className="city-list glass-effect">
			<div className="city-list-items">
				<ul>
					{cities.map((city) => (
						<City key={city.id} cityObj={city} onSelectCity={onSelectCity}></City>
					))}
				</ul>
			</div>
		</div>
	);
}
