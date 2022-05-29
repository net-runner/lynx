import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import StatsPage from '../containers/StatsPage';

const Stats = ({ stats }) => <StatsPage stats={stats} />;
export async function getServerSideProps() {
  const stats = await fetch(`${process.env.FRONTEND_URL}api/stats/`).then(
    (res) => res.json()
  );
  console.log(stats);
  return {
    props: { stats },
  };
}
Stats.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo title="Statistics" description="Lynx app statistics page." />
      {page}
    </AuthLayout>
  );
};
export default Stats;
