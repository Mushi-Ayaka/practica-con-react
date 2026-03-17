import { API_CONFIG } from './api.config';

export interface User {
    id: number;
    userName?: string;
    name?: string;
    initialIsFollowing?: boolean;
}

export const fetchUsers = async (): Promise<User[]> => {
    // Para probar el skeleton descomentar la siguiente linea y comentar el fetch
    // await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        // Avoid sending Content-Type header on GET requests to prevent unnecessary CORS preflight
        const headers = Object.fromEntries(
            Object.entries(API_CONFIG.headers || {}).filter(([k]) => k.toLowerCase() !== 'content-type')
        );

        const response = await fetch(`${API_CONFIG.baseURL}/users`, {
            headers
        });

        if (!response.ok) {
            throw new Error(`Error en la conexión con el servidor: ${response.statusText}`);
        }

        const data: User[] = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
