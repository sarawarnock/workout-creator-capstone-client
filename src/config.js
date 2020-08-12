export default {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT ||
    "http://localhost:8000/api",
    TOKEN_KEY: 'workout-client-auth-token',
}
  
console.log(process.env.REACT_APP_API_ENDPOINT) 