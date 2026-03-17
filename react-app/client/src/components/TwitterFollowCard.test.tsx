import { render, screen, fireEvent } from "@testing-library/react";
import { TwitterFollowCard } from "./TwitterFollowCard";
import { describe, it, expect } from 'vitest';

describe('TwitterFollowCard', () => {
  it('debe cambiar el texto del botón de "Seguir" a "Siguiendo" al hacer clic', () => {
    render(<TwitterFollowCard userName="testuser" name="Test User" initialIsFollowing={false} />);
    const button = screen.getByRole('button', { name: /Seguir a Test User/i });
    fireEvent.click(button);
    expect(button).toHaveTextContent(/Siguiendo/i);
  });
});
