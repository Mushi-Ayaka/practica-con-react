import React from "https://esm.sh/react@19.2.0";
import ReactDOM from "https://esm.sh/react-dom@19.2.0/client";
import htm from "https://esm.sh/htm";

// Initialize htm with React's createElement
const html = htm.bind(React.createElement);

const appDomElement = document.getElementById("app");
const root = ReactDOM.createRoot(appDomElement);

const button = html`<button>Click me</button>`;

// We use html`...` instead of JSX so it works directly in the browser
root.render(html`${button} <br /> <h1>Hola mundo</h1>`);
