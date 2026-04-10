import styles from './UserCard.module.css'
import { useUsers } from '@features/users/hooks/useUsers'
import { formatUsername } from '@common/utils/formatUsername'

interface UserCardProps {
    id: string
    userName?: string
    name?: string
    initialIsFollowing?: boolean
    index?: number
}

export function UserCard({ id, userName = "Unknown", name = "Unknown", initialIsFollowing = false, index = 0 }: UserCardProps) {
    const dynamicDelay = `${index * 0.1}s`;

    const { isFollowing, text, handleClick } = useUsers({ id, initialIsFollowing })
    const buttonClassName: string = isFollowing ? `${styles.button} ${styles.isFollowing}` : styles.button

    return (
        <article className={`${styles.followCard} ${styles.fadeIn}`} style={{ '--delay': dynamicDelay } as React.CSSProperties}>
            <header className={styles.followCardHeader}>
                <img className={styles.followCardAvatar} alt={`El avatar de ${name}`} src={`https://unavatar.io/x/${userName}`} />
                <div className={styles.followCardInfo}>
                    <strong className={styles.followCardInfoName}>{name}</strong>
                    <span className={styles.followCardInfoUsername}>{formatUsername(userName)}</span>
                </div>
            </header>

            <aside className={styles.followCardAside}>
                <button onClick={handleClick} className={buttonClassName} aria-pressed={isFollowing} aria-label={isFollowing ? `Dejar de seguir a ${name}` : `Seguir a ${name}`}>
                    <span className={styles.followCardButtonText}>{text}</span>
                    <span className={styles.followCardButtonUnfollow}>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}
