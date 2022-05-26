import AuthLayout from '../layouts/AuthLayout';
import { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import ErrorPanel from '../components/ErrorPanel';

const Custom404 = () => <ErrorPanel type={'404'} />;

Custom404.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo
        title="Page not found"
        description="Resource not found on the server."
      />
      {page}
    </AuthLayout>
  );
};

export default Custom404;
