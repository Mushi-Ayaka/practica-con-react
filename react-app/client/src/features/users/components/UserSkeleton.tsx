import styles from './UserCard.module.css'

export function UserSkeleton({ index = 0 }: { index?: number }) {
    const dynamicDelay = `${index * 0.1}s`;

    return (
        <article className={`${styles.followCard} ${styles.skeleton} ${styles.fadeIn}`} style={{ '--delay': dynamicDelay } as React.CSSProperties}>
            <header className={styles.followCardHeader}>
                <div className={`${styles.skeleton} ${styles.skeletonAvatar}`} />

                <div className={styles.followCardInfo}>
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                    <div className={`${styles.skeleton} ${styles.skeletonTextShort}`} />
                </div>
            </header>

            <aside className={styles.followCardAside}>
                <div className={`${styles.skeleton} ${styles.button}`} style={{ backgroundColor: '#333' }} />
            </aside>
        </article>
    )
}
