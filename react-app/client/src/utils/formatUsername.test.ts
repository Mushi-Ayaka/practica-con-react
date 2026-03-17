import { formatUsername } from "./formatUsername";
import { expect } from 'vitest';

describe('formatUsername', () => {
    it('debe agregar el @ al inicio del nombre de usuario', () => {
        expect(formatUsername('testuser')).toBe('@testuser');
    });
});
