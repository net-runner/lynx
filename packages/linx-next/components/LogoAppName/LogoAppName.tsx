import Link from 'next/link';
import React from 'react';
import LogoSmall from '../../assets/icons/LogoSmall';
import * as S from './LogoAppName.styled';

const LogoAppName = () => {
  return (
    <Link href={'/'} passHref>
      <a>
        <S.LAN>
          <LogoSmall />
          <p>LYNX</p>
        </S.LAN>
      </a>
    </Link>
  );
};

export default LogoAppName;
