import React from 'react';
import LogoAppName from '../../components/LogoAppName';
import Button from '../../components/Button';
import * as S from './Header.styled';
import { GithubIcon } from '../../assets/icons';

const Header = () => {
  return (
    <S.Header>
      <S.Nav>
        <LogoAppName />
        <S.HeaderTextLink href="/explore">Explore</S.HeaderTextLink>
        <S.HeaderTextLink href="/stats">Statistics</S.HeaderTextLink>
        <S.HeaderTextLink href="/top">Top Lynxers</S.HeaderTextLink>
      </S.Nav>
      <S.Nav>
        <Button>Sign up</Button>
        <a href="https://github.com/net-runner/lynx">
          <GithubIcon />
        </a>
      </S.Nav>
    </S.Header>
  );
};

export default Header;
