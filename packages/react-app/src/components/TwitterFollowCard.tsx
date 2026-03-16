import { useState } from 'react'
import styles from './TwitterFollowCard.module.css'

interface TwitterFollowCardProps {
    userName?: string
    name?: string
    initialIsFollowing?: boolean
}

const formatUsername = (userName: string): string => `@${userName}`

export function TwitterFollowCard({ userName = "Unknown", name = "Unknown", initialIsFollowing = false }: TwitterFollowCardProps) {
    const [isFollowing, setIsFollowing] = useState<boolean>(initialIsFollowing)

    const text: string = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName: string = isFollowing ? `${styles.button} ${styles.isFollowing}` : styles.button

    const handleClick = (): void => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className={styles.followCard}>
            <header className={styles.followCardHeader}>
                <img className={styles.followCardAvatar} alt={`El avatar de ${name}`} src={`https://unavatar.io/x/${userName}`} />
                <div className={styles.followCardInfo}>
                    <strong className={styles.followCardInfoName}>{name}</strong>
                    <span className={styles.followCardInfoUsername}>{formatUsername(userName)}</span>
                </div>
            </header>

            <aside className={styles.followCardAside}>
                <button onClick={handleClick} className={buttonClassName}>
                    <span className={styles.followCardButtonText}>
                        {text}
                    </span>
                    <span className={styles.followCardButtonUnfollow}>
                        Dejar de seguir
                    </span>
                </button>
            </aside>
        </article>
    )
}
