import { useState, useEffect } from "react";

// Funkcja do pobrania początkowej wartości z LocalStorage
function getStorageValue(key, defaultValue) {
	const saved = localStorage.getItem(key);
	// Jeśli w LocalStorage jest wartość, parsujemy ją, w przeciwnym razie zwracamy domyślną
	return saved ? JSON.parse(saved) : defaultValue;
}

export function useLocalStorage(key, defaultValue) {
	// Stan inicjalizowany wartością z LocalStorage
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	// Side Effect: zapisuje do LocalStorage za każdym razem, gdy 'value' się zmienia
	useEffect(() => {
		if (value !== null) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.removeItem(key); // Usuwamy, jeśli wartość to null
		}
	}, [key, value]);

	return [value, setValue];
}
