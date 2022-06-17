import { getTags } from '../../api/tag';
import React, { ReactElement } from 'react';
import { Tag } from '@prisma/client';
import TagList from '../../components/TagList';
import MainLayout from '../../layouts/MainLayout';

//Page with all tags listed
const AllTags = ({ tags }: { tags: Tag[] }) => {
  return <TagList tags={tags} />;
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
  return <MainLayout>{page}</MainLayout>;
};
export default AllTags;
