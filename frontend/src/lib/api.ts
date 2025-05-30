export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetcher = async (
  endpoint: string,
  method: string = 'GET',
  body?: unknown,
): Promise<unknown> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || 'Unknown error');
  }

  return res.json();
};
