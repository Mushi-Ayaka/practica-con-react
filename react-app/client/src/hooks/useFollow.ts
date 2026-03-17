import { useState } from 'react'

export function useFollow({ initialIsFollowing = false }: { initialIsFollowing?: boolean } = {}) {

    const [isFollowing, setIsFollowing] = useState<boolean>(initialIsFollowing)

    const text: string = isFollowing ? 'Siguiendo' : 'Seguir'

    const handleClick = (): void => {
        setIsFollowing(!isFollowing)
    }

    return {
        isFollowing,
        text,
        handleClick
    }
}
