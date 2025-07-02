export default function City({ cityObj, onSelectCity }) {
	const { name, timezone, country, admin1 } = cityObj;
	return (
		<li
			onClick={() => {
				onSelectCity(cityObj);
			}}
		>
			<div style={{ marginBottom: "0.4rem" }}>
				<p>
					<strong>{name}</strong>
				</p>
				{country}, {admin1}, {timezone}
			</div>
		</li>
	);
}
