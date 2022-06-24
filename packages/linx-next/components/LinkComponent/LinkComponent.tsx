import { Link as L } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import * as S from './LinkComponent.styled';
import { incrementLinkedCount } from '../../api/linkgroup';
import { OpenInNewTab, Trash } from '../../assets/icons';
import { useUser } from '../../context/user.context';
import { removeLink } from '../../api/link';

const LinkComponent = ({ link, groupId }: { link: L; groupId: string }) => {
  const { isUserResource } = useUser();
  const [isDisplayed, setDisplay] = useState(true);

  if (!isDisplayed) return null;

  const handleLinkRemove = async () => {
    const res = await removeLink(link.id);
    if (res.status === 200) setDisplay(false);
  };

  return (
    <S.LContainer>
      <S.LinkIco />
      <Link href={link.link} passHref>
        <span onClick={() => incrementLinkedCount(groupId)}>
          {link.description}
        </span>
      </Link>
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
      {isUserResource && (
        <S.DeleteIconWrapper
          onClick={async (e) => {
            e.stopPropagation();
            handleLinkRemove();
          }}
        >
          <Trash />
        </S.DeleteIconWrapper>
      )}
    </S.LContainer>
  );
};

export default LinkComponent;
