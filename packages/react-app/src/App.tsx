import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard.tsx'
import users from './data/users.json'

export function App() {

    return (
        <section className='App'>
            {
                users.map(({ id, userName, name, initialIsFollowing }) => (
                    <TwitterFollowCard
                        key={id}
                        userName={userName}
                        name={name}
                        initialIsFollowing={initialIsFollowing}
                    />
                ))
            }
        </section>
    )
}
