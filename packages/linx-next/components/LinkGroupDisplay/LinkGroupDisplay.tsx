import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { GroupTag, Link as L, LinkGroup, Tag } from '@prisma/client';
import LinkGroupHeader from '../LinkGroupHeader';
import LinkGroupBody from '../LinkGroupBody';

interface Props {
  data: LinkGroup & {
    tags: GroupTag[];
    links?: L[];
  };
  tags: (Tag & { _count: { Groups: number } })[];
  forwardedRef?: Ref<HTMLDivElement>;
}

const LinkGroupDisplay: React.FC<Props> = memo(
  ({ data, forwardedRef, tags }) => (
    <S.Wrapper ref={forwardedRef}>
      <LinkGroupHeader data={data} />
      <LinkGroupBody data={data} tags={tags} />
    </S.Wrapper>
  )
);
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
