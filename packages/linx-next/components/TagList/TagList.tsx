import { GroupTag, Tag } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import * as S from './TagList.styled';

interface Props {
  tags: (Tag & { _count: { Groups: number } })[];
  filterTags?: GroupTag[];
  showCount?: boolean;
  selectedTags?: number[];
  onClickHandler?: (index: number) => void;
}
const TagList = ({
  tags,
  filterTags,
  showCount,
  selectedTags,
  onClickHandler,
}: Props) => {
  const filterTaglist = useMemo(() => {
    if (!filterTags) return tags;
    return filterTags.map((tag) => {
      for (let index = 0; index < tags.length; index++) {
        const element = tags[index];
        if (tag.tag === element.id) {
          return element;
        }
      }
      return null;
    });
  }, [tags, filterTags]);

  const LinkWrapper = ({ tag, i, children }) => {
    if (onClickHandler)
      return <div onClick={() => onClickHandler(i)}>{children}</div>;
    return (
      <Link href={process.env.FRONTEND_URL + 't/' + tag.name}>{children}</Link>
    );
  };

  return (
    <S.Wrapper>
      {filterTaglist.map((tag, index) => (
        <S.TagContainer
          key={tag.name}
          selected={selectedTags && selectedTags.includes(index)}
        >
          <LinkWrapper i={index} tag={tag}>
            <a>
              {tag.name} {showCount && tag._count.Groups}
            </a>
          </LinkWrapper>
        </S.TagContainer>
      ))}
    </S.Wrapper>
  );
};

export default TagList;
