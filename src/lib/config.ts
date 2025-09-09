// Environment configuration utility
export const config = {
  // Environment
  env: import.meta.env.VITE_ENV || 'development',

  // API URLs
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.vrixaa-connect.com',
  graphqlUrl: import.meta.env.VITE_GRAPHQL_URL || 'https://api.vrixaa-connect.com/graphql',
  socketUrl: import.meta.env.VITE_SOCKET_URL || 'https://api.vrixaa-connect.com',

  // Google Maps API Key
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDfXY7zynCJ2IMwyoeTZ73Lvc2XzrKIBco',

  // Environment checks
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  isStaging: import.meta.env.VITE_ENV === 'staging',
  isProduction: import.meta.env.VITE_ENV === 'production',

  // Feature flags
  features: {
    debugMode: import.meta.env.VITE_ENV !== 'production',
    analytics: import.meta.env.VITE_ENV === 'production',
    errorReporting: import.meta.env.VITE_ENV === 'production',
  },
} as const;

// Log environment info in development
if (config.isDevelopment) {
  // Environment configuration loaded
}
