import { useQuery } from "@tanstack/react-query";
import { getWeatherDetails } from "../services/apiWeather";

export function useWeather(selectedCity) {
	const { latitude, longitude, timezone } = selectedCity || {};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["weather", latitude, longitude],
		queryFn: ({ signal }) => getWeatherDetails({ latitude, longitude, timezone, signal }),
		enabled: !!selectedCity && !!latitude && !!longitude && !!timezone,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
	});

	return { data, isLoading, isError, error: error?.message };
}
