import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserFollow } from '../services/UserServices'

export function useUsers({ id, initialIsFollowing = false }: { id: string, initialIsFollowing?: boolean }) {
    const queryClient = useQueryClient()
    const isFollowing = initialIsFollowing;


    const { mutate } = useMutation({
        mutationFn: () => updateUserFollow(id, !isFollowing),
        onSuccess: () => {
            // Invalidamos la cache para estar seguros de que todo el sistema sabe del cambio
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            // Si falla en el servidor, revertimos el cambio visual para no mentir al usuario
            console.error('Error al persistir el follow:', error);
        }
    })

    const text: string = isFollowing ? 'Siguiendo' : 'Seguir'

    const handleClick = (): void => {
        mutate() // Llamada al servidor
    }

    return {
        isFollowing,
        text,
        handleClick
    }
}
