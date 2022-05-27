import { ReactElement } from 'react';
import MainLayout from '../layouts/MainLayout';
import MainFeed from '../containers/MainFeed';
import { getgroup } from '../api/linkgroup';
import { GetServerSideProps } from 'next';

const Explore = ({ linkGroupData }) => (
  <MainFeed linkGroupData={linkGroupData} />
);

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  // Fetch the first page as default
  const page = parseInt(query.page as string) || 0;
  let linkGroupData = null;

  // Fetch data from external API
  try {
    // linkGroupData = await getgroup({ page, limit: 5 }) || null;
    //! ?_?
    linkGroupData = await (
      await fetch(`${process.env.FRONTEND_URL}/api/linkgroup/20/${page}`)
    ).json();
    console.log(linkGroupData);
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
