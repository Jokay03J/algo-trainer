import { useNavigate } from "@remix-run/react";
import { userAtom } from "atoms/user";
import { useAtom } from "jotai";
import { useState } from "react";

/**
 * An hook for register a teacher, return loading, error states and register function.
 */
export function useRegisterTeacher(): {
  isLoading: boolean;
  error: Error | null;
  register: (
    code: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
} {
  // Hook states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const register = async (
    code: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => {
    // Set loading as true and fetch register teacher api endpoint
    setIsLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/registerTeacher`,
      {
        method: "POST",
        body: JSON.stringify({ code, first_name, last_name, email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
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
  return { isLoading, error, register };
}
