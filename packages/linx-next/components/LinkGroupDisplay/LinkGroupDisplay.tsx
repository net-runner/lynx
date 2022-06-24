import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { GroupTag, Link as L, LinkGroup, Review, Tag } from '@prisma/client';
import LinkGroupHeader from '../LinkGroupHeader';
import LinkGroupBody from '../LinkGroupBody';

interface Props {
  data: LinkGroup & {
    tags: GroupTag[];
    links?: L[];
    reviews?: Review[];
  };
  tags: (Tag & { _count: { Groups: number } })[];
  forwardedRef?: Ref<HTMLDivElement>;
  addNewLinkToState?: (link: string) => void;
}

const LinkGroupDisplay: React.FC<Props> = memo(
  ({ data, forwardedRef, tags, addNewLinkToState }) => (
    <S.Wrapper ref={forwardedRef}>
      <LinkGroupHeader data={data} />
      <LinkGroupBody
        data={data}
        tags={tags}
        addNewLinkToState={addNewLinkToState}
      />
    </S.Wrapper>
  )
);
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
