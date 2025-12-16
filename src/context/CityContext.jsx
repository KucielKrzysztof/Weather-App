import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CityContext = createContext();

export function CityProvider({ children }) {
	const [selectedCity, setSelectedCity] = useLocalStorage("selectedCity", null);

	function clearCity() {
		setSelectedCity(null);
	}

	const contextValue = {
		selectedCity,
		setSelectedCity,
		clearCity,
	};

	return <CityContext.Provider value={contextValue}>{children}</CityContext.Provider>;
}

export function useCity() {
	const context = useContext(CityContext);
	if (!context) throw new Error("useCity must be used within a CityProvider");
	return context;
}
