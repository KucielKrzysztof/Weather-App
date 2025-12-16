import { useEffect } from "react";

export function useEscape(callback) {
	useEffect(() => {
		function handleEscape(event) {
			if (event.code === "Escape" && typeof callback === "function") {
				callback();
			}
		}
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [callback]);
}
