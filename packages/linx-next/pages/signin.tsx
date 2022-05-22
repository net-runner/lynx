import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import { LynxLogoDetail } from '../assets/icons';
import AuthLinkFlavor from '../components/AuthLinkFlavor';
import { MediumTopic } from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout';

const signin = () => {
  return (
    <>
      <NextSeo title="Signin" description="Sign in to your account." />

      <div className="auth-container">
        <AuthLinkFlavor type="up" />
        <LynxLogoDetail
          style={{ position: 'absolute', top: -25, right: -25 }}
        />
        <MediumTopic>Hi, welcome back!</MediumTopic>
        <h1>Signin</h1>
      </div>
    </>
  );
};

signin.getLayout = (page: ReactElement) => {
  return <AuthLayout type="signin">{page}</AuthLayout>;
};
export default signin;
