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

    // const formattedError =
    //   Array.isArray(err)
    //     ? JSON.stringify(err, null, 2)
    //     : err.error || err.message || 'Unknown error';

    // throw new Error(formattedError);

    if (Array.isArray(err)) {
    const messages = err.map((e) => e.message).join('\n');
    console.error("test 1 ",messages);
    throw new Error(messages);
    }

     if (err?.errors && Array.isArray(err.errors)) {
    type ErrorItem = { message: string };
    const messages = err.errors.map((e: ErrorItem) => e.message).join('\n');
    throw new Error(messages);
  }

  if (typeof err === "object" && err !== null) {
    const message = err.message || err.error || "Unknown error";
    throw new Error(message);
  }

    throw new Error("An unknown error occurred");
  }
  console.log("test 3 ",res.status, res.statusText);
  return res.json();

};
