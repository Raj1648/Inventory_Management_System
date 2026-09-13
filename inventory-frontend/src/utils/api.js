// Simple wrapper around fetch to inject Authorization headers
const API_URL = "http://localhost:5000/api";

const clearSessionAndRedirect = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const shouldResetSession = async (response, endpoint) => {
  if (endpoint.includes("/auth/login")) {
    return false;
  }

  if (response.status === 401) {
    return true;
  }

  if (response.status !== 400) {
    return false;
  }

  try {
    const payload = await response.clone().json();
    return /invalid token|jwt/i.test(payload?.message || "");
  } catch {
    return false;
  }
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (await shouldResetSession(response, endpoint)) {
    clearSessionAndRedirect();
  }

  return response;
};
