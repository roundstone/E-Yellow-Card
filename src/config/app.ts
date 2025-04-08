const config = {
    appName: import.meta.env.REACT_APP_APP_NAME || "Yellow Card",
    baseURL: import.meta.env.REACT_APP_BASE_URL || "http://localhost:3000",
    secretKey: import.meta.env.REACT_APP_SECRET_KEY || "default-api-key",
    environment: import.meta.env.NODE_ENV || "development",
    debugMode: import.meta.env.REACT_APP_DEBUG_MODE === "true",
  };
  
  export default config;