export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetcher = async<TResponse> (
  endpoint: string,
  method: string = 'GET',
  body?: unknown,
): Promise<TResponse> => {
  const headers: HeadersInit = {};

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

    if (!res.ok) {

      if (Array.isArray(data)) {
        throw new Error(data.map((e) => e.message).join('\n'));
      }

       if (data && typeof data === "object" && "errors" in data) {
        throw new Error((data.errors as { message: string }[]).map((e) => e.message).join('\n'));
      }

      if (typeof data === "object" && data !== null) {
        throw new Error((data as { message?: string; error?: string }).message || "Unknown error");
      }

      throw new Error("An unknown error occurred");
    }

  return data as TResponse;
};
