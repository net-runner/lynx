import { ReactElement } from 'react';
import MainLayout from '../layouts/MainLayout';
import MainFeed from '../containers/MainFeed';
import { GetServerSideProps } from 'next';
import { getGroups } from '../api/linkgroup';

const Explore = ({ linkGroupData }) => (
  <MainFeed linkGroupData={linkGroupData} />
);

export const getServerSideProps: GetServerSideProps = async () => {
  let linkGroupData;
  try {
    linkGroupData = await getGroups(7);
  } catch (err) {
    linkGroupData = { error: { message: err.message } };
  }

  // Pass data to the page via props
  return { props: { linkGroupData } };
};

Explore.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Explore;
