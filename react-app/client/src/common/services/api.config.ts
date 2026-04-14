// Production: VITE_API_URL must be set in Vercel to https://practica-react-server.onrender.com/api
export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
};
