import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dice from '../../games/Dice';

describe('Dice Component', () => {
  test('renders with initial value', () => {
    render(<Dice />);
    const diceElement = screen.getByTestId('dice');
    expect(diceElement).toBeInTheDocument();
    expect(diceElement).toHaveTextContent(/[1-6]/);
  });

  test('changes value when clicked', () => {
    render(<Dice />);
    const diceElement = screen.getByTestId('dice');
    const initialValue = diceElement.textContent;
    
    fireEvent.click(diceElement);
    
    expect(diceElement.textContent).not.toBe(initialValue);
    expect(diceElement.textContent).toMatch(/[1-6]/);
  });

  test('value is always between 1 and 6', () => {
    render(<Dice />);
    const diceElement = screen.getByTestId('dice');
    
    for (let i = 0; i < 10; i++) {
      fireEvent.click(diceElement);
      const value = Number(diceElement.textContent);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });
});
