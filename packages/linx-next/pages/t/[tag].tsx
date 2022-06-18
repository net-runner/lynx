import MainLayout from '../../layouts/MainLayout';
import React, { ReactElement } from 'react';
import MainFeed from '../../containers/MainFeed';
import { getTags } from '../../api/tag';

const TagName = ({ initialLinkGroups, tags }) => (
  <MainFeed
    linkGroupData={{
      currentPage: '5',
      groups: initialLinkGroups,
    }}
    tags={tags}
  />
);

export async function getStaticPaths() {
  const tags = await getTags();

  const paths = tags.map((t) => ({
    params: { tag: t.name },
  }));

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { tag } = context.params;
  const res = await fetch(`${process.env.FRONTEND_URL}api/tag/${tag}/g`).then(
    (res) => res.json()
  );
  const tags = await getTags();
  if (res === null || tags === null) {
    return {
      props: { initialLinkGroups: null },
    };
  } else {
    const { tagLinkGroups } = res;
    return {
      props: { initialLinkGroups: tagLinkGroups, tags },
    };
  }
}

TagName.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default TagName;
