import React from 'react';
import Link from 'next/link';
import * as S from './LinkGroupHeader.styled';
import { Link as L, Review as R, LinkGroup } from '@prisma/client';
import StatPill from '../StatPill';
import ReviewStars from '../ReviewStars';
import { LinkedAmountIcon, WatchersIcon } from '../../assets/icons';

interface Props {
  data: LinkGroup & {
    links?: L[];
    reviews?: R[];
  };
}

const LinkGroupHeader: React.FC<Props> = ({ data }) => {
  const {
    name,
    linkedCount,
    watcherCount,
    owner,
    groupname,
    linksCount,
    links,
    privacyLevel,
    reviews,
  } = data;

  const getReviewsCount = () => {
    if (reviews) return reviews.length;
    return 0;
  };
  const getScore = () => {
    if (!reviews) return 0;
    return (
      reviews.reduce((sum, review) => sum + review.score, 0) / getReviewsCount()
    );
  };
  const getLinksCount = () => {
    if (links) return links.length;
    return linksCount || 0;
  };

  return (
    <S.Header>
      <S.HeaderLeftPart>
        <S.TitleWrapper>
          <Link href={`/u/${owner}`}>{owner}</Link>
          <S.TitleDivider>&nbsp;/&nbsp;</S.TitleDivider>
          <Link href={`/u/${owner}/${groupname}`}>{name}</Link>
          {privacyLevel === 6 && <S.LockIco />}
        </S.TitleWrapper>
      </S.HeaderLeftPart>
      <S.HeaderRightPart>
        <S.StatsWrapper>
          <StatPill stat={getLinksCount()} ico={<S.LinkIco />} />
          <StatPill stat={linkedCount} ico={<LinkedAmountIcon />} />
          <StatPill stat={watcherCount} ico={<WatchersIcon />} />
        </S.StatsWrapper>
        <StatPill
          stat={`(${getReviewsCount()})`}
          ico={<ReviewStars rating={getScore()} />}
          isReversed={true}
        />
      </S.HeaderRightPart>
    </S.Header>
  );
};

export default LinkGroupHeader;
