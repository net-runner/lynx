import React, { memo, Ref } from 'react';
import * as S from './LinkGroupDisplay.styled';
import { Link as L, LinkGroup } from '@prisma/client';
import StatPill from '../StatPill';
import Link from 'next/link';
import { LinkedAmountIcon, WatchersIcon } from '../../assets/icons';
import ReviewStars from '../ReviewStars';
import LinkComponent from '../LinkComponent';

interface Props {
  data: LinkGroup & {
    links?: L[];
  };
  forwardedRef?: Ref<HTMLDivElement>;
}

const LinkGroupDisplay: React.FC<Props> = memo(({ data, forwardedRef }) => {
  const {
    id: groupId,
    name,
    description,
    linkedCount,
    watcherCount,
    owner,
    stars,
    groupname,
    links,
  } = data;
  const linksCount = () => {
    if (data.links) return data.links.length;
    return data.linksCount || 0;
  };
  return (
    <S.Wrapper ref={forwardedRef}>
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
            <StatPill stat={linksCount()} ico={<S.LinkIco />} />
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
      <S.Footer>
        <S.Description>{description}</S.Description>
        {links?.map((link) => (
          <LinkComponent link={link} key={link.id} groupId={groupId} />
        ))}
      </S.Footer>
    </S.Wrapper>
  );
});
LinkGroupDisplay.displayName = 'LinkGroupDisplay';

export default LinkGroupDisplay;
