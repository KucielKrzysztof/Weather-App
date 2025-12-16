import { useCallback, useState } from "react";

function getUserTimezone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function useGeolocation(onSuccess, onError) {
	const [isLoading, setIsLoading] = useState(false);

	/* Używamy useCallback, aby zapewnić stabilną referencję dla funkcji,
	 co jest ważne, jeśli hook miałby być używany w useEffect. */
	const getMyLocation = useCallback(() => {
		if (!navigator.geolocation) {
			if (onError) onError(new Error("Geolocation is not supported by your browser."));
			return;
		}
		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				const systemTimezone = getUserTimezone();
				onSuccess({ latitude, longitude, timezone: systemTimezone || "auto" });
				setIsLoading(false);
			},
			(error) => {
				console.error("Couldn't get the location: ", error.message);
				if (onError) onError(error);
				setIsLoading(false);
			}
		);
	}, [onSuccess, onError]);

	return { getMyLocation, isLoading };
}
