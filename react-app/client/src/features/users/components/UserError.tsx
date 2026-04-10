import { FallbackProps } from 'react-error-boundary';
import styles from './UserError.module.css';

export function UserError({ error, resetErrorBoundary }: FallbackProps) {
    let errorMessage = 'Algo salió mal';

    if (typeof error === 'string') {
        errorMessage = error;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (error && typeof (error as any).message === 'string') {
        errorMessage = (error as any).message;
    } else {
        try {
            const asString = String(error);
            if (asString && asString !== 'undefined') errorMessage = asString;
        } catch {
            // keep default
        }
    }

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
