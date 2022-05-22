//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const Offline = () => {
  return (
    <>
      <NextSeo
        title="Lynx is offline"
        description="Resource not cached or application is offline."
      />
      <h1>No connection or app is offline.</h1>
    </>
  );
};

Offline.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Offline;
