import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import SignUp from "../containers/SignUp";

const Signup = () => <SignUp />

Signup.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <NextSeo title="Signin" description="Sign in to your account." />

    {page}
  </AuthLayout>
);

export default Signup;
