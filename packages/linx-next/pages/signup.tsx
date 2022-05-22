import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout';

const signup = () => {
  return (
    <>
      <NextSeo title="SignUp" description="Create new Lynx account." />
      <div className="mx-auto">
        <h1>SignUp</h1>
      </div>
    </>
  );
};
signup.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default signup;
