import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout';

const Custom500 = () => {
  return (
    <>
      <NextSeo
        title="Serverside error"
        description="Server error occured refresh the page."
      />
      <div className="place-self-center">
        <h1>500 - Server-side error occurred</h1>
      </div>
    </>
  );
};
Custom500.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Custom500;
