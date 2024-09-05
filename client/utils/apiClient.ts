type Config = {
  params?: object;
  body?: object;
  headers?: object;
  url: string;
};

export class apiClient {
  static get<T>(config: Config): Promise<T> {
    return makeGeneric("GET", config);
  }
  static post<T>(config: Config): Promise<T> {
    return makeGeneric("POST", config);
  }
  static delete<T>(config: Config): Promise<T> {
    return makeGeneric("DELETE", config);
  }
  static patch<T>(config: Config): Promise<T> {
    return makeGeneric("PATCH", config);
  }
}

/**
 * Make the fetch request from config.
 */
async function makeGeneric<T>(method: string, config: Config): Promise<T> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/${config.url}${constructParams(
      config.params
    )}`,
    {
      method,
      body: JSON.stringify(config.body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config.headers,
      },
    }
  );
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}

/**
 * Transform params object to params string to be used inside a request.
 */
function constructParams(params: object | undefined): string {
  // If nos params found, return empty string
  if (!params) return "";
  let result = "?";
  // Loop inside params values
  for (const [key, value] of Object.entries(params)) {
    result += `&${key}=${value}`;
  }
  return result;
}
