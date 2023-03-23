import React from 'react';
import { render } from '@testing-library/react';
import ExpandingButton from './ExpandingButton';

describe('ExpandingButton', () => {
  const onClickHandler = jest.fn();

  it('renders the button text', () => {
    const { getByText } = render(
      <ExpandingButton
        onClickHandler={onClickHandler}
        text="Click me"
        type="static"
        size="big"
        site="left"
      />
    );
    expect(getByText('Click me')).toBeInTheDocument();
  });
});
