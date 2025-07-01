export default function City({ cityObj, onSelectCity }) {
	const { name, timezone, country, admin1 } = cityObj;
	return (
		<li
			onClick={() => {
				onSelectCity(cityObj);
			}}
		>
			<p>
				<p>
					<strong>{name}</strong>
				</p>
				{country}, {admin1}, {timezone}
			</p>
		</li>
	);
}
