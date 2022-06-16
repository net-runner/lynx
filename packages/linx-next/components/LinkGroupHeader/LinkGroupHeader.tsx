import React from 'react';
import Link from 'next/link';
import * as S from './LinkGroupHeader.styled';
import { Link as L, LinkGroup } from '@prisma/client';
import StatPill from '../StatPill';
import ReviewStars from '../ReviewStars';
import { LinkedAmountIcon, WatchersIcon } from '../../assets/icons';

interface Props {
  data: LinkGroup & {
    links?: L[];
  };
}

const LinkGroupHeader: React.FC<Props> = ({ data }) => {
  const {
    name,
    linkedCount,
    watcherCount,
    owner,
    stars,
    groupname,
    linksCount,
    links,
  } = data;
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
        </S.TitleWrapper>
      </S.HeaderLeftPart>
      <S.HeaderRightPart>
        <S.StatsWrapper>
          <StatPill stat={getLinksCount()} ico={<S.LinkIco />} />
          <StatPill stat={linkedCount} ico={<LinkedAmountIcon />} />
          <StatPill stat={watcherCount} ico={<WatchersIcon />} />
        </S.StatsWrapper>
        <StatPill
          stat={`(${watcherCount})`}
          ico={<ReviewStars rating={stars} />}
          isReversed={true}
        />
      </S.HeaderRightPart>
    </S.Header>
  );
};

export default LinkGroupHeader;
