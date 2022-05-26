//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import ErrorPanel from '../components/ErrorPanel';

const Offline = () => <ErrorPanel type={'offline'} />;

Offline.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo
        title="Lynx is offline"
        description="Resource not cached or application is offline."
      />
      {page}
    </AuthLayout>
  );
};
export default Offline;
