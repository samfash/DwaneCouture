const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const TIMEOUT_MS = 10000;

// Error tagging
const FETCHER_ERROR = Symbol('FetcherError');

type FetcherErrorType = {
  readonly isFetcherError: typeof FETCHER_ERROR;
  message: string;
  status: number;
  data?: unknown;
};

const createFetcherError = (
  message: string,
  status: number,
  data?: unknown
): FetcherErrorType => ({
  isFetcherError: FETCHER_ERROR,
  message,
  status,
  data,
});

type MaybeFetcherError = {
  isFetcherError?: symbol;
};

type ErrorResponse = {
  message?: string;
  error?: string;
  errors?: { message: string }[];
};

const isFetcherError = (err: unknown): err is FetcherErrorType =>
  typeof err === 'object' &&
  err !== null &&
  'isFetcherError' in err &&
  (err as MaybeFetcherError).isFetcherError === FETCHER_ERROR;

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const baseFetcher = async <T>(
  endpoint: string,
  method: Method = 'GET',
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const isForm = body instanceof FormData;
  const finalHeaders: Record<string, string> = { ...headers };

  if (!isForm) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: finalHeaders,
      body: isForm ? body as FormData : body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal: controller.signal,
    });

    let data: unknown = {};
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      const message = extractErrorMessage(data) || res.statusText;
      throw createFetcherError(message, res.status, data);
    }

    return data as T;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw createFetcherError('Request timed out', 408);
    }

    if (isFetcherError(err)) throw err;

    const message = err instanceof Error ? err.message : 'Unknown error';
    throw createFetcherError(message, 500);
  } finally {
    clearTimeout(timeout);
  }
};

const extractErrorMessage = (data: unknown): string | null => {
    if (!data || typeof data !== 'object') return null;

  const d = data as Partial<ErrorResponse>;

  if (Array.isArray(d.errors)) {
    return d.errors.map((e) => e.message).join('\n');
  }

  return d.message || d.error || null;
};

export const fetcher = {
  get: <T>(url: string, headers?: Record<string, string>) =>
    baseFetcher<T>(url, 'GET', undefined, headers),
  post: <T>(url: string, body?: unknown, headers?: Record<string, string>) =>
    baseFetcher<T>(url, 'POST', body, headers),
  put: <T>(url: string, body?: unknown, headers?: Record<string, string>) =>
    baseFetcher<T>(url, 'PUT', body, headers),
  patch: <T>(url: string, body?: unknown, headers?: Record<string, string>) =>
    baseFetcher<T>(url, 'PATCH', body, headers),
  delete: <T>(url: string, body?: unknown, headers?: Record<string, string>) =>
    baseFetcher<T>(url, 'DELETE', body, headers),
};

export { isFetcherError, createFetcherError };
