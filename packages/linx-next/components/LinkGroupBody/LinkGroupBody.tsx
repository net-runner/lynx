import React from 'react';
import * as S from './LinkGroupBody.styled';
import LinkComponent from '../LinkComponent';
import { Link as L, LinkGroup } from '@prisma/client';

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
    </S.Wrapper>
  );
};

export default LinkGroupBody;
