import React from 'react';
import * as S from './LandingPage.styled';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import { useUser } from '../../context/user.context';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <S.Wrapper>
      <S.Header>Manage your links with style</S.Header>
      <S.Info>
        Lynx helps you manage your bookmarks with ease & enables sharing and
        finding new exciting sites with a click of a button.
      </S.Info>
      <S.ButtonContainer>
        <Button
          onClick={() =>
            handleClick(!isAuthenticated ? 'signin' : `u/` + user.username)
          }
        >
          Manage bookmarks
        </Button>
        <Button onClick={() => handleClick('explore')}>Explore</Button>
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default LandingPage;
