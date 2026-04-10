import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchUsers } from '@features/users/services/UserServices';
import { UserCard } from './UserCard';
import { UserSkeleton } from './UserSkeleton';
import { UserError } from './UserError';
import styles from './UserList.module.css';

export function UserList() {
    const queryClient = useQueryClient();
    const { data: users, isPending, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });

    if (error) return <p>Hubo un error: {error.message}</p>;

    return (
        <ErrorBoundary FallbackComponent={UserError} onReset={() => queryClient.resetQueries({ queryKey: ['users'] })}>
            <div className={styles.listContainer}>
                {isPending && (
                    Array.from({ length: 5 }).map((_, index) => (
                        <UserSkeleton key={index} index={index} />
                    ))
                )}

                {!isPending && (users == null || users.length === 0) && (
                    <p>No hay usuarios</p>
                )}

                {!isPending && users?.map(({ id, userName, name, initialIsFollowing }, index) => (
                    <UserCard
                        key={id}
                        id={id}
                        index={index}
                        userName={userName}
                        name={name}
                        initialIsFollowing={initialIsFollowing}
                    />
                ))}
            </div>
        </ErrorBoundary>
    );
}
