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
        const response = await fetch(`${API_CONFIG.baseURL}/users`, {
            headers: API_CONFIG.headers
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
