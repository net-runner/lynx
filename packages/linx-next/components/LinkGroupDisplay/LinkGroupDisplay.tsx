import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { LinkGroup } from '@prisma/client';

interface LinkGroupWithUserName extends LinkGroup {
  userId: {
    name: string;
  };
}
interface Props {
  data: LinkGroupWithUserName;
  forwardedRef?: Ref<HTMLDivElement>;
}

const LinkGroupDisplay: React.FC<Props> = memo(({ data, forwardedRef }) => {
  const {
    name,
    description,
    linksAmount,
    linkedCount,
    watcherCount,
    picture,
    stars,
    userId: { name: ownerName },
  } = data;
  return (
    <S.Wrapper ref={forwardedRef}>
      <S.Header>{name}</S.Header>
      <S.Info>{ownerName}</S.Info>
      <S.Info>{description}</S.Info>
      <S.Info>{linksAmount}</S.Info>
      <S.Info>{linkedCount}</S.Info>
      <S.Info>{watcherCount}</S.Info>
      <S.Info>{picture}</S.Info>
      <S.Info>{stars}</S.Info>
    </S.Wrapper>
  );
});
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
