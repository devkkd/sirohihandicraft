const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const makeRequest = (endpoint, options = {}) =>
  fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // cookies automatically jayengi har request pe
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

export async function apiClient(endpoint, options = {}) {
  let res = await makeRequest(endpoint, options);

  // accessToken expire - silently refresh karo
  if (res.status === 401) {
    const refreshRes = await makeRequest("/api/auth/refresh", { method: "POST" });

    if (!refreshRes.ok) {
      // refreshToken bhi expire - login pe bhejo
      window.location.href = "/admin";
      return;
    }

    // Retry original request - naya accessToken cookie mein aa gaya
    res = await makeRequest(endpoint, options);
  }

  return res;
}
