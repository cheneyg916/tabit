import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Link from '../src/my-com/Link';
import { Demo } from '../src';

test('renders demo link', () => {
    render(<Demo />);
    const linkElement = screen.getByText(/hello/i);
    expect(linkElement).toBeInTheDocument();
});

it('renders correctly', () => {
    const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();
    expect(tree).toMatchSnapshot();
});
