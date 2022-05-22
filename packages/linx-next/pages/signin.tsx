import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import { LynxLogoDetail } from '../assets/icons';
import AuthLinkFlavor from '../components/AuthLinkFlavor';
import GithubLoginButton from '../components/GithubLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { MediumTopic } from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout';

const Signin = () => {
  return (
    <div className="auth-container">
      <AuthLinkFlavor type="up" />
      <LynxLogoDetail style={{ position: 'absolute', top: -25, right: -25 }} />
      <MediumTopic>Hi, welcome back!</MediumTopic>
      <h1>Signin</h1>
      <GithubLoginButton />
      <GoogleLoginButton />
    </div>
  );
};

Signin.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout type="signin">
      <NextSeo title="Signin" description="Sign in to your account." />
      {page}
    </AuthLayout>
  );
};
export default Signin;
