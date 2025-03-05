const config = {
    appName: process.env.REACT_APP_APP_NAME || "Yellow Card",
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000",
    secretKey: process.env.REACT_APP_SECRET_KEY || "default-api-key",
    environment: process.env.NODE_ENV || "development",
    debugMode: process.env.REACT_APP_DEBUG_MODE === "true",
  };
  
  export default config;