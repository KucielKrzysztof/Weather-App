export default function City({ cityObj, children, onSelectCity }) {
	const { id, name, latitude, longitude, timezone, country } = cityObj;
	return (
		<div
			onClick={() => {
				onSelectCity(cityObj);
			}}
		>
			{children}
			<p>{id}</p>
			<p>{name}</p>
			<p>{latitude}</p>
			<p>{longitude}</p>
			<p>{timezone}</p>
			<p>{country}</p>
		</div>
	);
}
