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
      <AuthLayout>
        <div className="mx-auto">
          <h1>404 - Page Not Found</h1>
        </div>
      </AuthLayout>
    </>
  );
};

Custom404.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Custom404;
