import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { LinkGroup } from '@prisma/client';
import StatPill from '../StatPill';
import Link from 'next/link';
import Image from 'next/image';
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
    picture,
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
      {/*<S.ImageContainer>*/}
      {/*  <Image*/}
      {/*    src={picture || '/images/linkgroupDefaultBackground.png'}*/}
      {/*    alt="defaultBackground"*/}
      {/*    height={200}*/}
      {/*    width={200}*/}
      {/*  />*/}
      {/*</S.ImageContainer>*/}
      {/*<S.ImageFade />*/}
    </S.Wrapper>
  );
});
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
