type Config = {
  params?: object;
  body?: object;
  headers?: object;
  url: string;
};

export class apiClient {
  static get(config: Config) {
    return makeGeneric("GET", config);
  }
  static post(config: Config) {
    return makeGeneric("POST", config);
  }
  static delete(config: Config) {
    return makeGeneric("DELETE", config);
  }
  static patch(config: Config) {
    return makeGeneric("PATCH", config);
  }
}

/**
 * Make the fetch request from config.
 */
async function makeGeneric(method: string, config: Config): Promise<any> {
  return fetch(
    `${import.meta.env.VITE_API_URL}/api/${config.url}${constructParams(
      config.params
    )}`,
    {
      method,
      body: JSON.stringify(config.body),
      headers: config.headers as Headers | undefined,
    }
  ).then((r) => r.json());
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
