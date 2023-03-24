import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkGroupHeader from './LinkGroupHeader';
import { Link as L, Review as R, LinkGroup } from '@prisma/client';

type DataType = LinkGroup & {
  links?: Partial<L>[];
  reviews?: Partial<R>[];
};
describe('LinkGroupHeader', () => {
  const data = {
    id: 'one',
    score: 1,
    name: 'Test Group',
    linkedCount: 5,
    watcherCount: 10,
    owner: 'testuser',
    groupname: 'testgroup',
    linksCount: 1,
    links: [{ id: '1', link: 'http://example.com' }],
    privacyLevel: 1,
    reviews: [
      { id: '1', score: 4 },
      { id: '2', score: 5 },
    ],
  } as Partial<DataType>;

  it('renders the component with the correct props', () => {
    render(<LinkGroupHeader data={data as any} />);
    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByText(`${data.owner}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.name}`)).toBeInTheDocument();
    expect(screen.getByText(data.linksCount.toString())).toBeInTheDocument();
    expect(screen.getByText(data.linkedCount.toString())).toBeInTheDocument();
    expect(screen.getByText(data.watcherCount.toString())).toBeInTheDocument();
    expect(screen.getByText(`(${data.reviews.length})`)).toBeInTheDocument();
  });
});
