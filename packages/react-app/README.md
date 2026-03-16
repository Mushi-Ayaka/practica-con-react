# Clon de Tarjeta de Seguimiento de Twitter/X (React)

Una aplicación de práctica en React que replica la funcionalidad visual y de estado de la tarjeta para seguir usuarios en Twitter/X.

## Acerca del Proyecto

Este proyecto es una aplicación modular en React construida para practicar el manejo de estados (`useState`), composición de componentes y renderizado de listas. Incluye un componente completo `TwitterFollowCard` que maneja los diferentes estados al seguir o dejar de seguir a un usuario, incluyendo efectos visuales que imitan el comportamiento de la interfaz real de Twitter/X. La aplicación consume un archivo JSON local de datos para renderizar dinámicamente varios usuarios.

## Tecnologías Utilizadas

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Estilos**: Vanilla CSS

## Cómo Empezar

### Prerrequisitos

- Node.js (se recomienda versión 18 o superior)
- npm o cualquier otro gestor de paquetes

### Instalación

```bash
# Navega al directorio de la aplicación React (si estás en la raíz del monorepo)
cd packages/react-app

# Instala las dependencias necesarias
npm install

# Inicia el servidor de desarrollo local
npm run dev
```

## Uso

Una vez que el servidor de desarrollo esté ejecutándose, abre tu navegador en la URL local que te proporciona Vite (habitualmente `http://localhost:5173`).

La interfaz te mostrará una lista de diferentes usuarios. Puedes interactuar con los botones de "Seguir" para visualizar los cambios dinámicos:

- Al hacer click en **"Seguir"**, el botón cambia su estado interno a **"Siguiendo"** y ajusta sus estilos.
- Al pasar el ratón (hover) sobre un botón que dice **"Siguiendo"**, este cambia a un color de advertencia revelando la acción de **"Dejar de seguir"**, replicando exactamente la UX destructiva moderna de las redes sociales.

## Estructura del Proyecto

```text
src/
├── components/
│   ├── TwitterFollowCard.css
│   └── TwitterFollowCard.jsx
├── data/
│   └── users.json
├── App.jsx
├── index.css
└── main.jsx
```
