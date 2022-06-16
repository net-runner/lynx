import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { Link as L, LinkGroup } from '@prisma/client';
import LinkGroupHeader from '../LinkGroupHeader';
import LinkGroupBody from '../LinkGroupBody';

interface Props {
  data: LinkGroup & {
    links?: L[];
  };
  forwardedRef?: Ref<HTMLDivElement>;
}

const LinkGroupDisplay: React.FC<Props> = memo(({ data, forwardedRef }) => (
  <S.Wrapper ref={forwardedRef}>
    <LinkGroupHeader data={data} />
    <LinkGroupBody data={data} />
  </S.Wrapper>
));
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
