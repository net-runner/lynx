import React from 'react';
import * as S from './LinkGroupBody.styled';
import { GroupTag, Link as L, LinkGroup, Tag } from '@prisma/client';
import LinkComponent from '../LinkComponent';
import LinkGroupForm from '../LinkGroupForm';
import TagList from '../TagList/';
import { useUser } from '../../context/user.context';

interface Props {
  data: LinkGroup & {
    tags: GroupTag[];
    links?: L[];
  };
  tags: (Tag & { _count: { Groups: number } })[];
  addNewLinkToState?: (link: string) => void;
}

const LinkGroupBody: React.FC<Props> = ({ data, tags, addNewLinkToState }) => {
  const { id: groupId, description, links, tags: dT } = data;
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
    </S.Wrapper>
  );
};

export default LinkGroupBody;
