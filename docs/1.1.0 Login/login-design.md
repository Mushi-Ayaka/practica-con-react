# Design Document: Authentication System

- **Requirement Reference:** [Spec-001](../specs/001-login.md)
- **Status:** In Review
- **Authors:** Mushi Ayaka

## 1. Visión General y Arquitectura

El sistema de autenticación actuará como el guardián de la aplicación. Se utilizará un flujo de JWT (JSON Web Tokens) con Refresh Tokens almacenados en cookies HttpOnly para equilibrar seguridad y persistencia.

## 2. Componentes e Interfaces

### 2.1. Backend API (Express + Zod)

- `POST /api/auth/login`: Valida credenciales, genera Access Token (breve) y Refresh Token (largo).
- `POST /api/auth/refresh`: Genera un nuevo Access Token usando el Refresh Token.
- `POST /api/auth/logout`: Invalida el Refresh Token en la base de datos y limpia la cookie.
- `GET /api/auth/me`: Devuelve la información del usuario actual (protegido por middleware).

### 2.1.1. Middleware de Proteccion de Rutas

- `express-rate-limit`: Protección ante fuerza bruta en login/registro.
- `authMiddleware`: Verifica la validez y expiración del JWT en rutas protegidas.

### 2.1.2. Controladores de Auth

- `Bcrypt`: Hashing de contraseñas con un factor de costo de 10-12.
- `jsonwebtoken`: Firma de tokens con claves secretas independientes para Access y Refresh.

### 2.2. Frontend (React + React Query/Axios)

- `AuthProvider`: Contexto que gestiona el estado de user y la interceptación de errores 401 para auto-refresh.
- `useAuth`: Hook para login/logout y acceso al perfil.
- `LoginForm`: UI con validaciones de Zod para feedback inmediato al usuario.

## 3. Modelos de Datos (Prisma)

Necesitaremos extender nuestro modelo de `User` para manejar hashes de contraseñas, y debe estar linkeada a supabase:

```prisma
model User {
    id       String @id @default(uuid())
    email    String @unique
    password String // Hash seguro
    refreshTokens RefreshToken[]
    createdAt     DateTime @default(now())
    // ... resto de campos existentes
}

model RefreshToken {
    id        String   @id @default(uuid())
    token     String   @unique
    userId    String
    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    expiresAt DateTime
    createdAt DateTime @default(now())
}
```

## 4. Manejo de Errores

- **400 Bad Request:** Datos malformados (fallo de validación Zod).
- **401 Unauthorized:** Token inválido o ausente.
- **403 Forbidden:** Sesión válida pero sin permisos para la acción.
- **429 Too Many Requests:** Protección ante fuerza bruta.

## 5. Estrategia de Testing (PBT)

- **Identity Invariant:** El userId en acciones sensibles debe coincidir siempre con el ID del token decodificado.
- **Unauthorized Invariant:** Rutas protegidas deben retornar !=a 200 sin un token válido.
- **Token Uniqueness:** Dos logins seguidos deben generar firmas de token distintas (uso de iat).
- **Password Security:** El campo password en DB nunca debe ser igual al input del usuario.
- **Token revocation:** Tras un logout, el Refresh Token antiguo no debe permitir generar nuevos Access Tokens.
- **Rate Limiting:** El sistema debe limitar el numero de intentos de inicio de sesion por IP.
- **Session Persistence:** El sistema debe permitir la persistencia de la sesion mas alla del cierre del navegador.
- **Session Revocation:** El sistema debe permitir la revocacion de la sesion actual.
- **Session Expiration:** El sistema debe permitir la expiracion de la sesion actual.

## 6. Próximos Pasos (Implementación Incremental)

1. Configuración Inicial: Definir esquemas de Zod y extender el Schema de Prisma.
2. Seguridad Backend: Implementar express-rate-limit y funciones de hashing.
3. Lógica de Tokens: Crear controladores de Login y Refresh con cookies HttpOnly.
4. Protección de Rutas: Middleware de verificación de JWT.
5. Estado Global: Crear el AuthProvider y configurar interceptores de Axios/Fetch para manejar el 401.
6. UI Final: Formulario de Login e integración de feedback de errores.
