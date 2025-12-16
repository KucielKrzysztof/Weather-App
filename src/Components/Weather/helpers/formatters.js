/* TIME && DATE FORMATTER */
export function formatTime(isoString, timezone) {
	if (!isoString) return "-";

	try {
		const date = new Date(isoString);

		return date.toLocaleDateString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			day: "numeric",
			month: "numeric",
			year: "numeric",
			hour12: false,
			timeZone: timezone !== "auto" ? timezone : undefined,
		});
	} catch (error) {
		console.log(error);
		return "Invalid Date";
	}
}
