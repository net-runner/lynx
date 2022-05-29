import React from 'react';
import * as S from './StatPill.styled';

interface Props {
  ico: JSX.Element;
  stat: number;
}

const StatPill: React.FC<Props> = ({ ico, stat }) => (
  <S.Wrapper>
    <div>{stat}</div>
    <S.IconWrapper>{ico}</S.IconWrapper>
  </S.Wrapper>
);
export default StatPill;
