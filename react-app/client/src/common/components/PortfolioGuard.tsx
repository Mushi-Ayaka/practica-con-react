import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const PortfolioGuard: React.FC<Props> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const referrer = document.referrer;
    const ALLOWED_REFERRERS = [
      'portafolio-jonatan-baron.vercel.app',
      'jonatanbaron.com',
      'localhost',
      ...(import.meta.env.VITE_ALLOWED_REFERRER ? [import.meta.env.VITE_ALLOWED_REFERRER] : []),
    ];
    
    // Si ya validamos en esta sesión, evitar re-chequeo
    const hasAccess = sessionStorage.getItem('demo_access_granted');

    if (hasAccess === 'true') {
      setIsAuthorized(true);
      return;
    }

    // Validación básica de Referrer
    // En producción, esto debería ser el dominio de tu portafolio
    if (ALLOWED_REFERRERS.some(r => referrer.includes(r)) || window.location.hostname === 'localhost') {
      sessionStorage.setItem('demo_access_granted', 'true');
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) return null; // Loading state

  if (!isAuthorized) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15202b',
        color: 'white',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1>Acceso Restringido</h1>
        <p>Esta demo es exclusiva para visitantes del portafolio de <strong>Jonatan Baron</strong>.</p>
        <a 
          href="https://jonatanbaron.com" 
          style={{ 
            marginTop: '20px', 
            color: '#1d9bf0', 
            textDecoration: 'none',
            fontWeight: 'bold',
            border: '1px solid #1d9bf0',
            padding: '10px 20px',
            borderRadius: '20px'
          }}
        >
          Volver al Portafolio
        </a>
      </div>
    );
  }

  return <>{children}</>;
};
