# Roadmap: Sistema de Autenticación Robust (JWT + Refresh Tokens)

Detalles sobre la ruta de implementación para el sistema de seguridad, integrando **Express**, **Prisma (Supabase)**, **React** y validación con **Zod**.

---

## Hitos de Implementación

### 1. Infraestructura y Base de Datos (Backend)

*Actualización de modelos para soportar persistencia de sesiones y seguridad de credenciales.*

- [ ] **Modificar `schema.prisma`**:
  - Añadir campo `password` (String) al modelo `User`.
  - Crear modelo `RefreshToken` con relación `@relation` al usuario.
- [ ] **Migración**: Ejecutar `npx prisma migrate dev` para actualizar Supabase.

### 2. Capa de Seguridad y Validación (Backend)

*Configuración de herramientas criptográficas y esquemas de datos.*

- [ ] **Utilidades (`auth.utils.ts`)**:
  - Implementar `hashPassword` y `comparePassword` con **Bcrypt**.
  - Implementar `generateAccessToken` y `generateRefreshToken` con **JWT**.
- [ ] **Esquemas (`auth.schema.ts`)**:
  - Definir validaciones de **Zod** para los cuerpos de `login` y `register` (min caracteres, formato email).

### 3. Lógica de Negocio (Backend)

*Endpoints y protección de acceso.*

- [ ] **Middleware (`auth.middleware.ts`)**:
  - Validador de JWT para inyectar `user` en el objeto `req`.
  - Implementación de `express-rate-limit` para el endpoint de login.
- [ ] **Controlador (`auth.controller.ts`)**:
  - Lógica de `login` (setear Cookie HttpOnly).
  - Lógica de `refresh` (rotación de tokens).
  - Lógica de `logout` (limpieza de DB y cookies).
- [ ] **Rutas (`auth.routes.ts`)**: Exponer los endpoints bajo el prefijo `/api/auth`.

### 4. Infraestructura de Sesión (Frontend)

*Gestión de identidad y persistencia en React.*

- [ ] **Servicios (`api.client.ts`)**:
  - Configurar instancia de **Axios/Fetch** con `withCredentials: true`.
  - Añadir interceptores para manejar el error **401** y disparar el re-intento con el Refresh Token.
- [ ] **Contexto (`AuthProvider.tsx`)**:
  - Crear estado global de `user`.
  - Implementar lógica de recuperación de sesión al cargar la app (`useEffect`).

### 5. Interfaz de Usuario (Frontend)

*Componentes finales y experiencia de usuario.*

- [ ] **Formulario (`LoginForm.tsx`)**:
  - Integrar **React Hook Form** + **Zod**.
  - Manejo de estados de carga y errores de autenticación.
- [ ] **Rutas Protegidas**: Crear componente `ProtectedRoute` para envolver vistas privadas.

---

## 🛡️ Plan de Verificación

### Pruebas Automatizadas (Enfoque PBT)

- [ ] **Invariant - Password Security**: Validar que el hash en DB nunca sea igual al input original.
- [ ] **Invariant - Unauthorized**: Probar que rutas protegidas devuelvan `401` sin token.
- [ ] **Invariant - Rate Limit**: Simular 100 peticiones en un minuto para confirmar el bloqueo `429`.

### Verificación Manual

- [ ] Confirmar que el `RefreshToken` no es accesible vía JavaScript (`document.cookie` vacío).
- [ ] Probar persistencia: Loguearse, cerrar pestaña, volver a entrar (debe mantener sesión).
- [ ] Probar revocación: Logout debe borrar el token de la base de datos de Supabase.

---

> [!IMPORTANT]
> **Nota de Seguridad**: Asegúrate de añadir `ACCESS_TOKEN_SECRET` y `REFRESH_TOKEN_SECRET` a tu archivo `.env` antes de comenzar el desarrollo
