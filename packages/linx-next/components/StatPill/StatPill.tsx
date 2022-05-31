import React from 'react';
import * as S from './StatPill.styled';

interface Props {
  ico: JSX.Element;
  stat: number | string;
  isReversed?: boolean;
}

const StatPill: React.FC<Props> = ({ ico, stat, isReversed }) => (
  <S.Wrapper isReversed={isReversed}>
    <div>{stat}</div>
    <S.IconWrapper>{ico}</S.IconWrapper>
  </S.Wrapper>
);
export default StatPill;
