import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { LinkGroup } from '@prisma/client';
import StatPill from '../StatPill';
import Link from 'next/link';
import { LinkedAmountIcon, WatchersIcon } from '../../assets/icons';

interface LinkGroupWithUserName extends LinkGroup {
  userId: {
    name: string;
  };
}
interface Props {
  data: LinkGroupWithUserName;
  forwardedRef?: Ref<HTMLDivElement>;
}

const LinkGroupDisplay: React.FC<Props> = memo(({ data, forwardedRef }) => {
  const {
    name,
    description,
    linksAmount,
    linkedCount,
    watcherCount,
    stars,
    userId: { name: ownerName },
  } = data;
  const author = `@${ownerName}`;
  return (
    <S.Wrapper ref={forwardedRef}>
      <S.Header>
        <S.TitleWrapper>
          <Link href={`/u/${ownerName}/g/${name}`}>{name}</Link>
          <Link href={`/u/${ownerName}`}>{author}</Link>
        </S.TitleWrapper>
        <S.StatsWrapper>
          <StatPill stat={linksAmount} ico={<S.LinkIco />} />
          <StatPill stat={linkedCount} ico={<LinkedAmountIcon />} />
          <StatPill stat={watcherCount} ico={<WatchersIcon />} />
        </S.StatsWrapper>
      </S.Header>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
});
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
