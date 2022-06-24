import React from 'react';
import * as S from './LinkGroupBody.styled';
import { GroupTag, Link as L, LinkGroup, Review, Tag } from '@prisma/client';
import LinkComponent from '../LinkComponent';
import LinkGroupForm from '../LinkGroupForm';
import TagList from '../TagList/';
import { useUser } from '../../context/user.context';
import ReviewComponent from '../ReviewComponent';

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
  const { isUserResource } = useUser();
  return (
    <S.Wrapper>
      <S.TagListContainer>
        <TagList tags={tags} filterTags={dT} />
      </S.TagListContainer>
      <S.Description>{description}</S.Description>
      {links?.map((link) => (
        <LinkComponent link={link} key={link.id} groupId={groupId} />
      ))}
      {isUserResource && links && (
        <LinkGroupForm
          groupId={groupId}
          addNewLinkToState={addNewLinkToState}
        />
      )}
      {reviews && (
        <S.Description style={{ marginTop: 20 }}>Reviews</S.Description>
      )}
      {reviews?.map((review) => (
        <ReviewComponent key={review.id} data={review} />
      ))}
    </S.Wrapper>
  );
};

export default LinkGroupBody;
