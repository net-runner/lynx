import { ReactElement } from 'react';
import MainLayout from '../layouts/MainLayout';
import MainFeed from '../containers/MainFeed';
import { GetServerSideProps } from 'next';
import { getGroups } from '../api/linkgroup';
import { getTags } from '../api/tag';

const Explore = ({ linkGroupData, tags }) => (
  <MainFeed linkGroupData={linkGroupData} tags={tags} mainFeedLocation={'explore'} />
);

export const getStaticProps: GetServerSideProps = async () => {
  const tags = await getTags();
  let linkGroupData;
  try {
    linkGroupData = await getGroups(7);
  } catch (err) {
    linkGroupData = { error: { message: err.message } };
  }
  // Pass data to the page via props
  return { props: { linkGroupData, tags } };
};

Explore.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Explore;
