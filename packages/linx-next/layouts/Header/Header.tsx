import React from 'react';
import LogoAppName from '../../components/LogoAppName';
import Button from '../../components/Button';
import * as S from './Header.styled';
import { GithubIcon } from '../../assets/icons';
import router from 'next/router';
import { useUser } from '../../context/user.context';

const Header = ({ type }: { type?: 'signin' | 'signup' }) => {
  const { user, isAuthenticated } = useUser();
  const handleClick = (href: string) => {
    router.push(href);
  };
  const AuthButtons = () => {
    switch (type) {
      case 'signup':
        return <Button onClick={() => handleClick('signup')}>Sign up</Button>;
      case 'signin':
        return <Button onClick={() => handleClick('signin')}>Sign in</Button>;
      default:
        return <></>;
    }
  };
  return (
    <S.Header>
      <S.Nav>
        <LogoAppName />
        <S.HeaderTextLink href="explore">Explore</S.HeaderTextLink>
        <S.HeaderTextLink href="stats">Stats</S.HeaderTextLink>
        <S.HeaderTextLink href="top">Top</S.HeaderTextLink>
      </S.Nav>
      <S.Nav>
        {!isAuthenticated && <AuthButtons />}
        <a href="https://github.com/net-runner/lynx">
          <GithubIcon />
        </a>
      </S.Nav>
    </S.Header>
  );
};

export default Header;
