import { getTags } from '../../api/tag';
import React, { ReactElement } from 'react';
import { Tag } from '@prisma/client';
import TagList from '../../components/TagList';
import AuthLayout from '../../layouts/AuthLayout';
import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 2;
  display: flex;
  width: 35vw;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  transform: translateY(-2.5rem);
`;

//Page with all tags listed
const AllTags = ({ tags }: { tags: Tag[] }) => {
  return (
    <Wrapper>
      <TagList tags={tags} showCount />
    </Wrapper>
  );
};
export async function getStaticProps(context) {
  const tags = await getTags();

  if (tags === null) {
    return {
      props: { tags: null },
    };
  } else {
    return {
      props: { tags },
    };
  }
}
AllTags.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default AllTags;
