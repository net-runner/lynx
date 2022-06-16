import React from 'react';
import * as S from './LinkGroupBody.styled';
import { Link as L, LinkGroup } from '@prisma/client';
import LinkComponent from '../LinkComponent';
import LinkGroupForm from '../LinkGroupForm';

interface Props {
  data: LinkGroup & {
    links?: L[];
  };
}

const LinkGroupBody: React.FC<Props> = ({ data }) => {
  const { id: groupId, description, links } = data;
  return (
    <S.Wrapper>
      <S.Description>{description}</S.Description>
      {links?.map((link) => (
        <LinkComponent link={link} key={link.id} groupId={groupId} />
      ))}
      <LinkGroupForm />
    </S.Wrapper>
  );
};

export default LinkGroupBody;
