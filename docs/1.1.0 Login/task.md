# Tareas de Implementación: Sistema de Login

- [ ] **Fase 1: Infraestructura y Base de Datos (Backend)**
  - [ ] Instalar dependencias Backend (`bcrypt`, `jsonwebtoken`, `express-rate-limit`, `cookie-parser`, `@types/bcrypt`, `@types/jsonwebtoken`, `@types/cookie-parser`).
  - [ ] Modificar `schema.prisma` (Añadir `password` en User, crear modelo `RefreshToken`).
  - [ ] Ejecutar `npx prisma migrate dev`.

- [ ] **Fase 2: Capa de Seguridad y Validación (Backend)**
  - [ ] Implementar `auth.utils.ts` (Hashing Bcrypt y firmas JWT).
  - [ ] Implementar `auth.schema.ts` (Validadores Zod para Input).

- [ ] **Fase 3: Lógica de Negocio (Backend)**
  - [ ] Configurar `cookie-parser` en `index.ts`.
  - [ ] Implementar `auth.middleware.ts` (Validador JWT y Rate Limiter).
  - [ ] Implementar `auth.controller.ts` (Login, Logout, Refresh).
  - [ ] Registrar `auth.routes.ts` bajo `/api/auth`.

- [ ] **Fase 4: Infraestructura de Sesión (Frontend)**
  - [ ] Configurar cliente HTTP (fetch o axios) con `withCredentials: true` e interceptor de 401.
  - [ ] Establecer `AuthProvider` y Hook `useAuth`.

- [ ] **Fase 5: Interfaz de Usuario (Frontend)**
  - [ ] Desarrollar `LoginForm.tsx` (con Zod y React Hook Form).
  - [ ] Desarrollar componente envoltorio `ProtectedRoute`.

- [ ] **Fase 6: Verificación de Seguridad**
  - [ ] Comprobar que contraseñas no viajan en plano a DB.
  - [ ] Comprobar inaccesibilidad del Refresh Token en Frontend (`document.cookie`).
  - [ ] Comprobar rotación tras un 401.
