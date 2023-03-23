import { Link as L } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import * as S from './LinkComponent.styled';
import { incrementLinkedCount } from '../../api/linkgroup';
import { OpenInNewTab, Trash } from '../../assets/icons';
import { removeLink } from '../../api/link';
import { revalidate } from '../../api/revalidate';
interface Props {
  link: L;
  groupId: string;
  creatorName: string;
  groupName: string;
  isUserResource?: boolean;
}
const LinkComponent = ({
  link,
  groupId,
  creatorName,
  groupName,
  isUserResource,
}: Props) => {
  const [isDisplayed, setDisplay] = useState(true);

  const handleLinkRemove = async () => {
    const res = await removeLink(link.id);
    if (res.status === 200) setDisplay(false);

    await revalidate(`/u/${creatorName}`);
    await revalidate(`/u/${creatorName}/${groupName}`);
  };
  if (!isDisplayed) return null;
  return (
    <S.LContainer>
      <S.LinkIco />
      <Link data-testid={'new-tab-icon'} href={link.link} passHref>
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
          data-testid={'delete-icon'}
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
