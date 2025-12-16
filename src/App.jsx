import "./assets/styles/main.css";
import AppLayout from "./Components/ui/AppLayout";
import AppContent from "./Components/ui/AppContent";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CityProvider } from "./context/CityContext";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<CityProvider>
					<AppLayout>
						<AppContent />
						<ReactQueryDevtools />
					</AppLayout>
				</CityProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
