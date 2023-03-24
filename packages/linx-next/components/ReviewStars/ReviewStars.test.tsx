import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReviewStars from './ReviewStars';

describe('ReviewStars component', () => {
  const onChangeMock = jest.fn();

  it('renders empty stars when rating is 0', () => {
    const { container } = render(<ReviewStars rating={0} />);
    expect(
      container.querySelectorAll('[data-testid="star-empty"]')
    ).toHaveLength(5);
  });

  it('renders full stars up to the rating', () => {
    const { container } = render(<ReviewStars rating={3.5} />);
    expect(
      container.querySelectorAll('[data-testid="star-full"]')
    ).toHaveLength(3);
    expect(
      container.querySelectorAll('[data-testid="star-half"]')
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('[data-testid="star-empty"]')
    ).toHaveLength(1);
  });

  it('calls onChange when a star is clicked and isInput is true', () => {
    const { container } = render(
      <ReviewStars rating={0} isInput={true} onChange={onChangeMock} />
    );
    const secondStar = container.querySelectorAll(
      '[data-testid="star-empty"]'
    )[1];
    fireEvent.click(secondStar);
    expect(onChangeMock).toHaveBeenCalledWith(2);
  });
});
