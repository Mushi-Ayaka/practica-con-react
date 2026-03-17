import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react'
import { App } from './App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback.tsx';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <StrictMode>
        <App />
      </StrictMode>
    </ErrorBoundary>
  </QueryClientProvider>
);
