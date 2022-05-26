import AuthLayout from '../layouts/AuthLayout';
import { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import ErrorPanel from '../components/ErrorPanel';

const Custom500 = () => <ErrorPanel type={'500'} />;

Custom500.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo
        title="Serverside error"
        description="Server error occured refresh the page."
      />
      {page}
    </AuthLayout>
  );
};

export default Custom500;
