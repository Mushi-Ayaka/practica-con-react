# Implementation Plan: Authentication System (Express + JWT)

Se implementará un sistema de autenticación robusto basado en JWT y Refresh Tokens siguiendo las especificaciones de diseño.

## User Review Required

> [!WARNING]
> Este plan requiere añadir campos sensibles a la base de datos y manejar Cookies HttpOnly. Esto cambiará ligeramente cómo se testean las peticiones en el frontend (CORS y Credentials).

## Proposed Changes

### 1. Infraestructura y Base de Datos (Backend)

Actualización de los modelos para soportar persistencia de sesiones.

#### [MODIFY] [schema.prisma](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/database/prisma/schema.prisma)

- Extensión del modelo `User` (password).
- [NEW] Modelo `RefreshToken`.
- Ejecutar migración de Prisma.

### 2. Capa de Seguridad (Backend)

Configuración de utilidades criptográficas y validación.

#### [NEW] [auth.utils.ts](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/server/utils/auth.ts)

- Funciones para Hashing y Verificación (Bcrypt).

- Funciones para Firmado/Verificación de JWT (Access y Refresh).

#### [NEW] [auth.schema.ts](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/server/schemas/auth.ts)

- Esquemas de Zod para validación de Body (Login/Register).

### 3. Lógica de Negocio y Rutas (Backend)

#### [NEW] [auth.controller.ts](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/server/controllers/auth.ts)

- Endpoints: `login`, `logout`, `refresh`, `me`.

#### [NEW] [auth.routes.ts](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/server/routes/auth.ts)

- Registro de rutas y aplicación de Rate Limiting.

#### [NEW] [auth.middleware.ts](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/server/middlewares/auth.ts)

- Protector de rutas para inyectar `user` en `req`.

### 4. Infraestructura de Sesión (Frontend)

Gestión global de la identidad y tokens.

#### [NEW] [AuthProvider.tsx](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/client/src/features/auth/context/AuthProvider.tsx)

- Estado del usuario y manejo de expiración de sesión.

#### [NEW] [api.client.ts](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/client/src/common/services/api.client.ts)

- Interceptores para inyectar tokens y manejar el auto-refresh con el código 401.

### 5. Interfaz de Usuario (Frontend)

#### [NEW] [LoginForm.tsx](file:///c%3A/Users/Josue%20B/Desktop/Josue%20B/Documents/Jonatan%20Baron/Proyectos/Practica%20con%20React/react-app/client/src/features/auth/components/LoginForm.tsx)

- Formulario reactivo y feedback de seguridad.

## Verification Plan

### Automated Tests (PBT focus)

- Ejecución de scripts en el servidor para validar que contraseñas NO se guardan en plano.
- Simulación de peticiones 401 para validar el auto-refresh.

### Manual Verification

1. Login exitoso -> Redirección.
2. Logout -> Verificación de borrado de Cookie HttpOnly.
3. Intento de acceso sin token -> 401 Block.
