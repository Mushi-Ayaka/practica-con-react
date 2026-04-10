import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react'
import { App } from './App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary';
import { UserError } from '@features/users/components/UserError';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={UserError}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
