import { useNavigate } from "@remix-run/react";
import { userAtom } from "atoms/user";
import { useAtom } from "jotai";
import { useState } from "react";

/**
 * An hook for login user, return loading, error states and login function.
 */
export function useLogin(): {
	isLoading: boolean;
	error: Error | null;
	login: (email: string, password: string) => Promise<void>;
} {
	// Hook states
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [user, setUser] = useAtom(userAtom);
	const navigate = useNavigate();

	const login = async (email: string, password: string) => {
		// Set loading as true and fetch login api endpoint
		setIsLoading(true);
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		// Get data from the request
		const data = await res.json();
		// Set loading as false
		setIsLoading(false);
		// Handle error
		if (!res.ok) {
			// If error, set error to the error state
			setError(new Error(data.message));
			return;
		}
		// Set user token to the user state
		setUser({ ...user, token: data.token });
		// Navigate to the home page
		navigate("/");
	};
	// Return hook states and login function
	return { isLoading, error, login };
}
