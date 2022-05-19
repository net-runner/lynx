import React from 'react';
import LogoAppName from '../LogoAppName/LogoAppName';
import { HeaderStyled, HeaderTextLink } from './Header.styled';

const Header = () => {
  return (
    <HeaderStyled>
      <LogoAppName />
      <HeaderTextLink href="/explore">Explore</HeaderTextLink>
      <HeaderTextLink href="/stats">Statistics</HeaderTextLink>
      <HeaderTextLink href="/top">Top Lynxers</HeaderTextLink>
    </HeaderStyled>
  );
};

export default Header;
