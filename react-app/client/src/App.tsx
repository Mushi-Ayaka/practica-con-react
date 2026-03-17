import './App.css'
import { fetchUsers } from './services/UserServices'
import { TwitterFollowCard } from './components/TwitterFollowCard.tsx'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SkeletonFollowCard } from './components/SkeletonFollowCard.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback.tsx';

export function App() {
    const queryClient = useQueryClient();
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });

    //  Simula que algo explotó antes de renderizar en la siguiente linea
    //const Bomb = () => {
    //    throw new Error("🔥 Error forzado para probar el Boundary");
    //};

    if (error) return <p>Hubo un error: {error.message}</p>;

    return (
        <section className='App'>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => queryClient.resetQueries({ queryKey: ['users'] })}>
                {/* llamar la funcion Bomb para simular un error */}
                {/* {users ? <Bomb /> : null} */}

                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonFollowCard key={index} />
                    ))
                ) : (
                    users?.map(({ id, userName, name, initialIsFollowing }, index) => (
                        <TwitterFollowCard
                            key={id}
                            index={index}
                            userName={userName}
                            name={name}
                            initialIsFollowing={initialIsFollowing}
                        />
                    ))
                )}
            </ErrorBoundary>
        </section>

    )
}
