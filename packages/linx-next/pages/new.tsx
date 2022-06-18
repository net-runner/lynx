import React, { ReactElement } from 'react';
import { getTags } from '../api/tag';
import CreateLinkGroup from '../components/CreateLinkGroup';
import MainLayout from '../layouts/MainLayout';

//New linkgroup creation screen
const New = ({ tags }) => {
  return <CreateLinkGroup tags={tags} />;
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
New.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
New.requireAuth = true;
export default New;
