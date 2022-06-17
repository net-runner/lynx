import { GroupTag, Tag } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import * as S from './TagList.styled';

interface Props {
  tags: Tag[];
  filterTags?: GroupTag[];
}
const TagList = ({ tags, filterTags }: Props) => {
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

  return (
    <S.Wrapper>
      {filterTaglist.map((tag) => (
        <S.TagContainer key={tag.name}>
          <Link href={process.env.FRONTEND_URL + 't/' + tag.name}>
            <a>{tag.name}</a>
          </Link>
        </S.TagContainer>
      ))}
    </S.Wrapper>
  );
};

export default TagList;
