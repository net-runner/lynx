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
  tags: Tag[];
}

const LinkGroupBody: React.FC<Props> = ({ data, tags }) => {
  const { id: groupId, description, links, tags: dT } = data;
  const { isUserResource } = useUser();
  return (
    <S.Wrapper>
      <TagList tags={tags} filterTags={dT} />
      <S.Description>{description}</S.Description>
      {links?.map((link) => (
        <LinkComponent link={link} key={link.id} groupId={groupId} />
      ))}
      {isUserResource && links && <LinkGroupForm />}
    </S.Wrapper>
  );
};

export default LinkGroupBody;
