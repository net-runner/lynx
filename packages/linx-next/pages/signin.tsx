import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import SignIn from '../containers/SignIn';

const SigninPage = () => <SignIn />;

SigninPage.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout type="signin">
      <NextSeo title="Signin" description="Sign in to your account." />
      {page}
    </AuthLayout>
  );
};

export default SigninPage;
