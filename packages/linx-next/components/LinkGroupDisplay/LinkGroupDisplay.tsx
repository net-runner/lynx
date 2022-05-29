import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { LinkGroup } from '@prisma/client';
import StatPill from '../StatPill';
import Link from 'next/link';
import { LinkedAmountIcon, WatchersIcon } from '../../assets/icons';
import ReviewStars from '../ReviewStars';

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
  const reviewsStat = `(${watcherCount})`
  return (
    <S.Wrapper ref={forwardedRef}>
      <S.Header>
        <S.HeaderLeftPart>
          <S.TitleWrapper>
            <Link href={`/u/${ownerName}`}>{ownerName}</Link>
            <S.TitleDivider>&nbsp;/&nbsp;</S.TitleDivider>
            <Link href={`/u/${ownerName}/g/${name}`}>{name}</Link>
          </S.TitleWrapper>
        </S.HeaderLeftPart>
        <S.HeaderRightPart>
          <S.StatsWrapper>
            <StatPill stat={linksAmount} ico={<S.LinkIco />} />
            <StatPill stat={linkedCount} ico={<LinkedAmountIcon />} />
            <StatPill stat={watcherCount} ico={<WatchersIcon />} />
          </S.StatsWrapper>
          <StatPill stat={reviewsStat} ico={<ReviewStars rating={stars} />} isReversed={true} />
        </S.HeaderRightPart>
      </S.Header>
      <S.Footer>
        <S.Description>{description}</S.Description>
      </S.Footer>
    </S.Wrapper>
  );
});
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
