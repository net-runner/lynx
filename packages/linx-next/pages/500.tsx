import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout';

const Custom500 = () => {
  return (
    <div className="error-route-container">
      <h1>500 - Server-side error occurred</h1>
    </div>
  );
};
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
