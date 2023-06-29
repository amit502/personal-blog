import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Button from './Button';

afterEach(() => {
    cleanup();
});

test('Button is rendered with correct label', () => {
    render(<Button label="Test label" />);
    const btnElement = screen.getByRole('button', { name: 'Test label' });
    expect(btnElement).toBeInTheDocument();
});

test('Button click is functional', () => {
    let a = 2;
    const handleClick = () => {
        a = 5;
    };
    render(<Button label="Test label" handleClick={handleClick} />);
    const btnElement = screen.getByRole('button', { name: 'Test label' });
    fireEvent.click(btnElement);
    expect(a).toEqual(5);
});
