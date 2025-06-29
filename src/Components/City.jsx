export default function City({ cityObj }) {
	const { id, name, latitude, longitude, timezone, country } = cityObj;
	return (
		<div>
			<p>{id}</p>
			<p>{name}</p>
			<p>{latitude}</p>
			<p>{longitude}</p>
			<p>{timezone}</p>
			<p>{country}</p>
		</div>
	);
}
