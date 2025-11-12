import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Error from '../Error';

describe('Error component', () => {
  it('renders the error message', () => {
    render(<Error />);
    const el = screen.getByText(/Error loading user data/i);
    // con Vitest comprobamos que el elemento existe en el DOM
    expect(el).toBeTruthy();
  });

  it('has a visually distinctive error box', () => {
    render(<Error />);
    const el = screen.getByText(/Error loading user data/i);
    // comprobación simple de la clase CSS (evitamos matchers de jest-dom)
    expect(el.className.includes('text-red-500')).toBe(true);
  });
});
