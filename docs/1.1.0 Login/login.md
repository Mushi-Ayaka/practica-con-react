# Specification: User Authentication System

- **Version:** 1.1.0-draft
- **Status:** In Review
- **Feature:** Login & Session Management

## 1. User Story

**Como** usuario visitante de la web
**quiero** poder iniciar sesión con credenciales seguras
**para** poder seguir y dejar de seguir permanentemente a otros usuarios bajo mi propia identidad

## 2. Acceptance Criteria (EARS Syntax)

| ID | Case | Description |
| :--- | :--- | :--- |
| **EARS-1** | *Event-driven* | **WHEN** el usuario ingresa credenciales validas y envia el formulario, **the system SHALL** establecer una sesion segura y redirigir al dashboard. |
| **EARS-2** | *State-driven* | **WHILE** un usuario no esta autenticado, **the system SHALL** restringir operaciones de escritura privadas (seguir/dejar de seguir) con un estado de error `401 Unauthorized`. |
| **EARS-3** | *State-driven* | **WHILE** una peticion falla con un 401 debido a un token expirado, **the system SHALL** limpiar el estado de autenticacion local y redirigir al login. |
| **EARS-4** | *Optional* | **WHERE** una opcion "Recordarme" esta marcada, **the system SHALL** extender la persistencia de la sesion mas alla del cierre del navegador. |
| **EARS-5** | *Event-driven* | **WHEN** el usuario activa la accion de cerrar sesion, **the system SHALL** revocar el token de sesion actual y purgar el estado de autenticacion local. |
| **EARS-6** | *Unwanted* | **IF** el inicio de sesion falla debido a credenciales incorrectas, **the system SHALL** mostrar un mensaje de error generico seguro para la seguridad (sin indicar si el usuario existe). |

## 3. PBT Properties (Property-Based Testing)

- **Identity Invariant:** Para todos los cambios de estado, el `followerId` en una relacion de seguimiento DEBE SER SIEMPRE igual al `userId` de la sesion autenticada actual.
- **Unauthorized Invariant:** Para todos los endpoints de API protegidos, una solicitud SIN un JWT/Session-Token valido DEBE resultAR SIEMPRE en una respuesta no 200.
- **Token Uniqueness:** Para dos sesiones distintas, los tokens de autenticacion generados NO DEBEN SER NUNCA identicos.
