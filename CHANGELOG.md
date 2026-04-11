# Changelog

Todos los cambios notables de este proyecto se documentaran en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
 y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-09

### Added

- **Frontend**: Twitter/X Tarjeta de usuario construida con React 19 y Vite.
- **Frontend**: datos obtenidos y gestionados usando TanStack Query v5.
- **Backend**: Node.js/Express server con TypeScript support.
- **Database**: Prisma 7 implementado con Driver Adapter para Supabase (PostgreSQL).
- **Persistence**: Persistencia de la lógica de seguir/dejar de seguir integrada con los modelos de Prisma.
- **UX**: Estados de carga esqueléticos y actualizaciones optimistas para acciones de seguimiento.
- **Infrastructure**: Estructura de monorepo de Workspace.

### Changed

- Migración de datos mock locales de JSON a una base de datos real de Supabase PostgreSQL.
- Optimización de las conexiones a la base de datos mediante el modo de agrupación (puerto 6543) para mayor estabilidad.
- Mejora de la experiencia de usuario al garantizar una ordenación de listas determinista y reducir el parpadeo en la nueva obtención de datos.

### [Unreleased] Added

- Documentación para Login System Spec (Fase de borrador).
