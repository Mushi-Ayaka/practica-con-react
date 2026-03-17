import { FallbackProps } from 'react-error-boundary';
import styles from './ErrorFallback.module.css';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const errorMessage = error instanceof Error ? error.message : 'Algo salió mal';

    return (
        <div className={styles.container} role="alert">
            <h2 className={styles.title}>Vaya, parece que algo ha fallado</h2>

            <p className={styles.message}>
                {errorMessage}. Intenta recargar la página para ver las sugerencias de nuevo.
            </p>

            <button
                className={styles.retryButton}
                onClick={resetErrorBoundary}
            >
                Reintentar
            </button>
        </div>
    );
}
