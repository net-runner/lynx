import AuthLayout from '../layouts/AuthLayout';
import { ReactElement } from 'react';
import { NextSeo } from 'next-seo';

const Custom404 = () => {
  return (
    <>
      <NextSeo
        title="Page not found"
        description="Resource not found on the server."
      />

      <div className="error-route-container">
        <h1>404 - Page Not Found</h1>
      </div>
    </>
  );
};

Custom404.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Custom404;
