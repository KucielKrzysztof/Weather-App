import { useQuery } from "@tanstack/react-query";
import { getCityDetails } from "../services/apiWeather";

export function useCitySearch(query) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["cities", query],
		queryFn: ({ signal }) => {
			return getCityDetails(query, signal);
		},
		enabled: !!query && query.length >= 3,
		staleTime: 1000 * 60 * 15,
		refetchOnWindowFocus: false,
	});

	return { data, isLoading, isError, error: error?.message };
}
