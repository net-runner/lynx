import React from 'react';
import * as S from './StatsPage.styled';

interface StatsInterface {
  users: number;
  links: number;
  linkGroups: number;
  tags: number;
  review: number;
}

const StatsPage = ({ stats }: { stats: StatsInterface }) => {
  return (
    <S.Wrapper>
      <S.Logo />
      <S.Info>Users: {stats.users}</S.Info>
      <S.Info>Links: {stats.links}</S.Info>
      <S.Info>Tags: {stats.tags}</S.Info>
      <S.Info>Reviews: {stats.review}</S.Info>
      <S.Info>Groups: {stats.linkGroups}</S.Info>
    </S.Wrapper>
  );
};

export default StatsPage;
