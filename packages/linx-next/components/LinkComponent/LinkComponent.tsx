import { Link as L } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import * as S from './LinkComponent.styled';
import { incrementLinkedCount } from '../../api/linkgroup';
import { OpenInNewTab } from '../../assets/icons';

const LinkComponent = ({ link, groupId }: { link: L; groupId: string }) => {
  return (
    <Link href={link.link} passHref>
      <S.LContainer onClick={() => incrementLinkedCount(groupId)}>
        <S.LinkIco />
        <div>{link.description}</div>
        <S.NewTabIconWrapper
          href={link.link}
          target={'_blank'}
          onClick={(e) => {
            e.stopPropagation();
            incrementLinkedCount(groupId);
          }}
          rel="noreferrer"
        >
          <OpenInNewTab />
        </S.NewTabIconWrapper>
      </S.LContainer>
    </Link>
  );
};

export default LinkComponent;
