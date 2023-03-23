import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Link as L } from '@prisma/client';
import LinkComponent from './LinkComponent';
import { incrementLinkedCount } from '../../api/linkgroup';

jest.mock('../../api/link');
jest.mock('../../api/linkgroup');

describe('LinkComponent', () => {
  const mockLink = {
    id: '1',
    link: 'https://example.com',
    description: 'Example Link',
  } as L;
  const mockGroupId = 'group1';
  const mockCreatorName = 'user1';
  const mockGroupName = 'group1';

  it('renders the link description', () => {
    const { getByText } = render(
      <LinkComponent
        link={mockLink}
        groupId={mockGroupId}
        creatorName={mockCreatorName}
        groupName={mockGroupName}
      />
    );
    expect(getByText('Example Link')).toBeInTheDocument();
  });

  it('increments the linked count when the link is clicked', () => {
    const { getByText } = render(
      <LinkComponent
        link={mockLink}
        groupId={mockGroupId}
        creatorName={mockCreatorName}
        groupName={mockGroupName}
      />
    );
    fireEvent.click(getByText('Example Link'));
    expect(incrementLinkedCount).toHaveBeenCalledWith(mockGroupId);
  });
});
