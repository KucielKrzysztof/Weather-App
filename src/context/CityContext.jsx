import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

export function CityProvider({ children }) {
	const [selectedCity, setSelectedCity] = useState(() => {
		const saved = localStorage.getItem("selectedCity");
		return saved ? JSON.parse(saved) : null;
	});

	function clearCity() {
		setSelectedCity(null);
		localStorage.removeItem("selectedCity");
	}
	/* SAVE to localstorage */
	useEffect(() => {
		if (selectedCity) {
			localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
		}
	}, [selectedCity]);

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
