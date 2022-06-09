import { Link as L } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import * as S from './LinkComponent.styled';

const LinkComponent = ({ link }: { link: L }) => {
  return (
    <Link href={link.link} passHref>
      <S.LContainer>
        <S.LinkIco />
        <div>
          <div>{link.description}</div>
        </div>
      </S.LContainer>
    </Link>
  );
};

export default LinkComponent;
