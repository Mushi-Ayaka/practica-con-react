# Twitter/X Follow Card — Fullstack Clone

Aplicación fullstack que replica la experiencia de las tarjetas de seguimiento de Twitter/X, con **persistencia real de datos** mediante Prisma y Supabase.

## Acerca del Proyecto

Este proyecto es una evolución de una maqueta estática hacia una aplicación funcional completa. Se implementó un flujo de datos bidireccional donde el estado de seguimiento ("Following") ya no es efímero, sino que se persiste en una base de datos PostgreSQL con Supabase. El sistema utiliza **actualizaciones optimistas** mediante TanStack Query para una experiencia de usuario instantánea y fluida.

## Stack

| Capa | Tecnologías |
| ------ | ------------ |
| **Frontend** | React 19, TypeScript, Vite 8, CSS Modules |
| **Backend** | Node.js, Express 4, Prisma 7 (Driver Adapter) |
| **BBDD** | PostgreSQL (Supabase) |
| **Data Fetching** | TanStack React Query v5 (con Invalidation) |
| **Testing** | Vitest, Testing Library |
| **Estilos** | Vanilla CSS (Flujo Gentleman-Skills) |

## Estructura del Proyecto

```text
practica-con-react/
├── react-app/
│   ├── client/                # Aplicación Frontend (Vite + React)
│   ├── server/                # API Backend (Express + Prisma)
│   │   ├── controllers/       # Lógica de orquestación
│   │   ├── models/            # Lógica de datos (Prisma queries)
│   │   └── routes/            # Definición de endpoints
│   └── database/              # Infraestructura de datos
│       ├── prisma/            # Esquemas y migraciones
│       └── users.json         # Datos semilla iniciales
```

## Cómo Empezar

### Prerrequisitos

- Node.js >= 20 (Recomendado para compatibilidad con Prisma 7)
- Cuenta en **Supabase** (para la base de datos remota)

### Configuración del Entorno

Crea un archivo `.env` en `react-app/server/` con tus credenciales:

```env
DATABASE_URL="postgresql://user:pass@host:port/postgres"
DATABASE_URL_POOLING="postgresql://user:pass@host:port/postgres?pgbouncer=true"
```

### Instalación y Ejecución

1. **Instalar dependencias:** `npm install` (desde la raíz)
2. **Levantar el Servidor:** `cd react-app/server && npm run dev`
3. **Levantar el Cliente:** `cd react-app/client && npm run dev`

## API Reference

| Método | Endpoint | Descripción |
| -------- | ---------- | ------------- |
| `GET` | `/api/users` | Obtiene todos los usuarios ordenados alfabéticamente. |
| `PATCH` | `/api/users/:id/follow` | Alterna el estado de seguimiento de un usuario. |

## Características Destacadas

- **Persistencia Real:** Los cambios sobreviven a reinicios de servidor gracias a la integración con Supabase.
- **Pooling Mode:** Conexiones estables de base de datos usando PGBouncer para evitar cierres inesperados durante HMR.
- **Zero Flicker UX:** Uso de `isPending` en lugar de `isLoading` para evitar parpadeos de Skeletons durante las actualizaciones en segundo plano.
- **Seed Inteligente:** Script de siembra no destructivo que utiliza `upsert` para mantener los datos existentes.

---
Proyecto desarrollado como práctica de arquitectura en React.
