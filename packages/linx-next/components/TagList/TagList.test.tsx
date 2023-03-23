import { render, screen } from '@testing-library/react';
import TagList from './TagList';

describe('TagList', () => {
  const tags = [
    { id: 1, name: 'tag1', _count: { Groups: 5 } },
    { id: 2, name: 'tag2', _count: { Groups: 3 } },
    { id: 3, name: 'tag3', _count: { Groups: 1 } },
  ] as any[];

  it('renders a list of tags', () => {
    render(<TagList tags={tags} />);
    const tag1 = screen.getByText('tag1');
    const tag2 = screen.getByText('tag2');
    const tag3 = screen.getByText('tag3');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(tag3).toBeInTheDocument();
  });

  it('displays tag counts when showCount is true', () => {
    render(<TagList tags={tags} showCount={true} />);
    const tag1 = screen.getByText('tag1 5');
    const tag2 = screen.getByText('tag2 3');
    const tag3 = screen.getByText('tag3 1');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(tag3).toBeInTheDocument();
  });

  it('calls onClickHandler when a tag is clicked', () => {
    const onClickHandler = jest.fn();
    render(<TagList tags={tags} onClickHandler={onClickHandler} />);
    const tag1 = screen.getByText('tag1');
    const tag2 = screen.getByText('tag2');
    const tag3 = screen.getByText('tag3');
    tag1.click();
    tag2.click();
    tag3.click();
    expect(onClickHandler).toHaveBeenCalledTimes(3);
    expect(onClickHandler).toHaveBeenCalledWith(0);
    expect(onClickHandler).toHaveBeenCalledWith(1);
    expect(onClickHandler).toHaveBeenCalledWith(2);
  });
});
