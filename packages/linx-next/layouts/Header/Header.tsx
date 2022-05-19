import React from 'react';
import LogoAppName from '../../components/LogoAppName/LogoAppName';
import * as S from './Header.styled';

const Header = () => {
  return (
    <S.Header>
      <LogoAppName />
      <S.HeaderTextLink href="/explore">Explore</S.HeaderTextLink>
      <S.HeaderTextLink href="/stats">Statistics</S.HeaderTextLink>
      <S.HeaderTextLink href="/top">Top Lynxers</S.HeaderTextLink>
    </S.Header>
  );
};

export default Header;
