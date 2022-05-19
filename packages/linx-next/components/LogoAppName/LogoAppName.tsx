import Link from 'next/link';
import React from 'react';
import LogoSmall from '../LogoSmall';
import { LAN } from './LogoAppName.styled';

const LogoAppName = () => {
  return (
    <Link href={'/'} passHref>
      <a>
        <LAN>
          <LogoSmall />
          <p>LYNX</p>
        </LAN>
      </a>
    </Link>
  );
};

export default LogoAppName;
