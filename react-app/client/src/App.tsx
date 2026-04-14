import './App.css'
import { UserList } from '@features/users/components/UserList'
import { PortfolioGuard } from './common/components/PortfolioGuard'

export function App() {
    return (
        <PortfolioGuard>
            <section className='App'>
                <UserList />
            </section>
        </PortfolioGuard>
    )
}

