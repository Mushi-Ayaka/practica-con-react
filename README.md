# Clone de Tarjeta de Seguimiento de Twitter/X (Fullstack)

Una aplicación práctica que replica la funcionalidad de seguimiento de Twitter/X, ahora con una arquitectura desacoplada de cliente y servidor.

## Acerca del Proyecto

    Este proyecto es una aplicación fullstack diseñada para practicar la integración de una interfaz dinámica en React con una API real en Node.js. 

- **Frontend**: Utiliza React 19 y TypeScript para manejar estados complejos de seguimiento y composición de componentes.
- **Backend**: Un servidor Express minimalista que sirve datos desde un archivo JSON centralizado, preparándolo para una futura integración con MongoDB.
- **Interacción**: El componente `TwitterFollowCard` imita fielmente la UX de Twitter, incluyendo cambios de estado visuales (hover destructivo) al seguir/dejar de seguir.

## Estructura del Proyecto

    ```text
react-app/
├── client/          # Aplicación Frontend (Vite + React)
├── serv/            # API Backend (Node.js + Express)
└── data/            # Fuente de datos centralizada (JSON)
    ```

## Tecnologías Utilizadas

- **Frontend**: React 19, Vite 8, TypeScript, Vanilla CSS.
- **Backend**: Node.js, Express, CORS.

## Cómo Empezar

### Prerrequisitos

- Node.js >= 18
- npm o yarn

### Instalación y Ejecución

Para que la aplicación funcione correctamente, debes iniciar tanto el servidor como el cliente:

#### 1. Iniciar el Servidor (API)

    ```bash
cd react-app/serv
npm install
npm start
    ```

#### 2. Iniciar el Cliente (React)

    ```bash
cd react-app/client
npm install
npm run dev
    ```

## Uso

Una vez iniciados ambos servicios:

1. Abre tu navegador en la URL del cliente (habitualmente `http://localhost:5173`).
2. La aplicación cargará los usuarios consultando automáticamente a la API local (`http://localhost:3000/api/users`).
3. Interactúa con las tarjetas para ver los cambios de estado y estilos dinámicos.
