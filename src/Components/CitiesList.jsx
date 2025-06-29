import City from "./City";
export default function CitiesList({ cities }) {
	return (
		<div>
			<p>LIST:</p>
			{cities.map((city) => (
				<>
					<p>City:</p>
					<City key={city.id} cityObj={city}></City>
				</>
			))}
		</div>
	);
}
