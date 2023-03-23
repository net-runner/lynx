import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children prop', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('passes type prop to button element', () => {
    const { getByRole } = render(<Button type="submit">Click me</Button>);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
