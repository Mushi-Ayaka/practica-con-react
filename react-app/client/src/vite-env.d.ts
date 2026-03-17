/// <reference types="vite/client" />

declare module './components/TwitterFollowCard.module.css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '@testing-library/jest-dom' {
    import '@testing-library/jest-dom/extend-expect';
}

