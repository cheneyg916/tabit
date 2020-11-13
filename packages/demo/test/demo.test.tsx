import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Demo } from '../src';

test('renders demo link', () => {
    render(<Demo />);
    const linkElement = screen.getByText(/hello/i);
    expect(linkElement).toBeInTheDocument();
});

