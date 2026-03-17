# Twitter/X Follow Card — Fullstack Clone

Aplicación fullstack que replica la experiencia de las tarjetas de seguimiento de Twitter/X, construida con React 19, TypeScript y un servidor Express.

## Acerca del Proyecto

Este proyecto implementa una réplica fiel de las tarjetas de "Seguir" de Twitter/X con una arquitectura cliente-servidor desacoplada. El frontend consume una API REST propia para obtener la lista de usuarios, renderiza tarjetas interactivas con animaciones de entrada escalonadas, estados de carga tipo skeleton y manejo robusto de errores mediante `ErrorBoundary`. El componente `TwitterFollowCard` reproduce la UX original de Twitter, incluyendo el efecto hover destructivo ("Dejar de seguir") con cambios de estado visuales inmediatos.

## Tech Stack

| Capa | Tecnologías |
|------|------------|
| **Frontend** | React 19, TypeScript, Vite 8, CSS Modules |
| **Backend** | Node.js, Express 4, ES Modules |
| **Data Fetching** | TanStack React Query v5 |
| **Manejo de Errores** | react-error-boundary |
| **Testing** | Vitest, Testing Library, jsdom |
| **Linting** | ESLint 9, eslint-plugin-react-hooks |

## Estructura del Proyecto

```text
practica-con-react/
├── react-app/
│   ├── client/                # Aplicación Frontend
│   │   ├── src/
│   │   │   ├── components/    # TwitterFollowCard, SkeletonFollowCard, ErrorFallback
│   │   │   ├── hooks/         # useFollow (estado de seguimiento)
│   │   │   ├── services/      # UserServices, api.config
│   │   │   └── utils/         # formatUsername
│   │   └── vite.config.ts     # Config de Vite + path aliases (@/, @components/, etc.)
│   ├── serv/                  # API Backend (Express)
│   │   └── index.js           # Servidor con endpoint GET /api/users
│   └── data/
│       └── users.json         # Fuente de datos centralizada
├── tsconfig.json              # Config TypeScript con path aliases
├── package.json               # Monorepo con npm workspaces
└── .gitignore
```

## Cómo Empezar

### Prerrequisitos

- Node.js >= 18
- npm

### Instalación

```bash
git clone https://github.com/Mushi-Ayaka/practica-con-react.git
cd practica-con-react
npm install
```

### Ejecución

La aplicación requiere que tanto el servidor como el cliente estén corriendo simultáneamente.

**1. Iniciar el servidor (API):**

```bash
cd react-app/serv
npm start
```

El servidor arranca en `http://localhost:3000`.

**2. Iniciar el cliente (React) — en otra terminal:**

```bash
cd react-app/client
npm run dev
```

El cliente arranca en `http://localhost:5173`.

## Uso

1. Abre `http://localhost:5173` en tu navegador.
2. La aplicación consulta automáticamente `GET /api/users` y renderiza las tarjetas con animaciones de entrada escalonadas.
3. Mientras la data carga, se muestran skeletons animados como placeholder visual.
4. Haz clic en **Seguir** para seguir a un usuario — el botón cambia a **Siguiendo**.
5. Pasa el cursor sobre **Siguiendo** para ver el estado destructivo **Dejar de seguir**, idéntico a la UX de Twitter/X.

## API Reference

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/users` | Retorna la lista de usuarios desde `data/users.json` |

**Ejemplo de respuesta:**

```json
[
  {
    "id": 1,
    "userName": "midudev",
    "name": "Miguel",
    "initialIsFollowing": true
  }
]
```

## Testing

El proyecto utiliza **Vitest** con **Testing Library** para tests unitarios y de componentes.

```bash
npm test
```

Los tests verifican:
- Que `TwitterFollowCard` alterna correctamente el texto del botón al hacer clic.
- Que `formatUsername` agrega el prefijo `@` al nombre de usuario.

## Características Técnicas

- **CSS Modules** para estilos encapsulados y sin colisiones de nombres.
- **Path aliases** (`@/`, `@components/`, `@hooks/`, etc.) configurados tanto en Vite como en TypeScript para imports limpios.
- **TanStack React Query** para data fetching declarativo con cache automático.
- **Error Boundaries** a dos niveles: uno global en `main.tsx` y otro granular en `App.tsx`, ambos con UI de fallback en español.
- **Skeleton loading** como placeholders visuales durante la carga de datos.
- **Animaciones de entrada escalonadas** con CSS `@keyframes` y delays dinámicos por índice.
- **Accesibilidad**: botones con `aria-pressed` y `aria-label` dinámicos.
- **npm Workspaces** para manejar el monorepo con dependencias compartidas.
