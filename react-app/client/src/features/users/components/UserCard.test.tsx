import { render, screen, fireEvent } from "@testing-library/react";
import { UserCard } from "./UserCard";
import { describe, it, expect } from 'vitest';

describe('UserCard', () => {
  it('debe cambiar el texto del botón de "Seguir" a "Siguiendo" al hacer clic', () => {
    render(<UserCard userName="testuser" name="Test User" initialIsFollowing={false} />);
    const button = screen.getByRole('button', { name: /Seguir a Test User/i });
    fireEvent.click(button);
    expect(button).toHaveTextContent(/Siguiendo/i);
  });
});
