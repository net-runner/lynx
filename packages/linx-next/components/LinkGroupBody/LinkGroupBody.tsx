import React, { useMemo } from 'react';
import * as S from './LinkGroupBody.styled';
import { GroupTag, Link as L, LinkGroup, Review, Tag } from '@prisma/client';
import LinkComponent from '../LinkComponent';
import LinkGroupForm from '../LinkGroupForm';
import TagList from '../TagList/';
import { useUser } from '../../context/user.context';
import ReviewComponent from '../ReviewComponent';
import ReviewForm from '../ReviewForm';

interface Props {
  data: LinkGroup & {
    tags: GroupTag[];
    links?: L[];
    reviews?: Review[];
  };
  tags: (Tag & { _count: { Groups: number } })[];
  addNewLinkToState?: (link: string) => void;
}

const LinkGroupBody: React.FC<Props> = ({ data, tags, addNewLinkToState }) => {
  const { id: groupId, description, links, tags: dT, reviews } = data;
  const { isUserResource, isAuthenticated, user } = useUser();

  const hasAlreadyReviewed = useMemo(() => {
    if (reviews && user && user?.username) {
      for (let index = 0; index < reviews.length; index++) {
        const review = reviews[index];
        if (review.creatorName === user.username) return true;
      }
      return false;
    }
  }, [reviews, user]);
  return (
    <S.Wrapper>
      <S.TagListContainer>
        <TagList tags={tags} filterTags={dT} />
      </S.TagListContainer>
      <S.Description>{description}</S.Description>
      {links?.map((link) => (
        <LinkComponent link={link} key={link.id} groupId={groupId} />
      ))}
      {isUserResource && (
        <LinkGroupForm
          groupId={groupId}
          addNewLinkToState={addNewLinkToState}
        />
      )}
      {reviews?.length > 0 && (
        <S.Description style={{ marginTop: 20 }}>Reviews</S.Description>
      )}
      {reviews?.map((review) => (
        <ReviewComponent key={review.id} data={review} />
      ))}
      {!isUserResource && !hasAlreadyReviewed && isAuthenticated && (
        <ReviewForm creatorName={user && user.username} groupId={groupId} />
      )}
    </S.Wrapper>
  );
};

export default LinkGroupBody;
