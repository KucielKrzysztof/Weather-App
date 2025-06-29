import City from "./City";
export default function CitiesList({ cities, onSelectCity }) {
	return (
		<div>
			<p>LIST:</p>
			{cities.map((city) => (
				<City key={city.id} cityObj={city} onSelectCity={onSelectCity}>
					<p>City:</p>
				</City>
			))}
		</div>
	);
}
