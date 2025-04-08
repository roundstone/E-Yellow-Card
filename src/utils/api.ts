
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const apiFetch = async (endpoint, options = {}, auth = true) => {
    const headers = {
      "Content-Type": "application/json",
    };
  
    // Attach JWT token only if auth is true
    if (auth) {
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
  
    const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers,
    });
  
    const data = await response.json();

    if (data.statusCode === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token"); // Delete token
      window.location.reload();
    }

    if (!response.ok) throw new Error(data.message || "Something went wrong");

    return data;
};