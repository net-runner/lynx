import React from 'react';
import LogoAppName from '../../components/LogoAppName';
import Button from '../../components/Button';
import * as S from './Header.styled';
import { GithubIcon } from '../../assets/icons';
import { useUser } from '../../context/user.context';
import UserDropdown from '../../components/UserDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserNav from '../UserNav';

const Header = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const handleClick = (href: string) => {
    router.push(process.env.FRONTEND_URL + href);
  };
  const AuthButtons = () =>
    router.pathname === '/signin' ? (
      <Button onClick={() => handleClick('signup')}>Sign up</Button>
    ) : (
      <Button onClick={() => handleClick('signin')}>Sign in</Button>
    );

  return (
    <S.Header>
      <S.Nav>
        <LogoAppName />
        <Link href="/explore">Explore</Link>
        <Link href="/stats">Stats</Link>
        <Link href="/top">Top</Link>
        <Link href="/t/all">Tags</Link>
      </S.Nav>
      <S.Nav>
        {isAuthenticated && <UserNav />}
        {!isAuthenticated && <AuthButtons />}
        <Link href="https://github.com/net-runner/lynx">
          <a>
            <GithubIcon />
          </a>
        </Link>
      </S.Nav>
    </S.Header>
  );
};

export default Header;
