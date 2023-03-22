import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('renders without crashing', () => {
    render(<LandingPage />);
  });

  it('renders the header text', () => {
    render(<LandingPage />);
    const header = screen.getByText('Manage your links with style');
    expect(header).toBeTruthy();
  });

  it('renders the info text', () => {
    render(<LandingPage />);
    const info = screen.getByText(
      'Lynx helps you manage your bookmarks with ease & enables sharing and finding new exciting sites with a click of a button.'
    );
    expect(info).toBeTruthy();
  });

  it('calls router.push with the correct href when the manage bookmarks button is clicked', () => {
    const router = { push: jest.fn() };

    render(<LandingPage />);
    const manageBookmarksButton = screen.getByText('Manage bookmarks');
    fireEvent.click(manageBookmarksButton);
    expect(router.push).toHaveBeenCalledWith('u/testuser');
  });

  it('calls router.push with the correct href when the explore button is clicked', () => {
    const router = { push: jest.fn() };
    render(<LandingPage />);
    const exploreButton = screen.getByText('Explore');
    fireEvent.click(exploreButton);
    expect(router.push).toHaveBeenCalledWith('explore');
  });
});
