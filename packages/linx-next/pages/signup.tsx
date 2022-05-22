import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import { LynxLogoDetailNoCircle } from '../assets/icons';
import AuthLinkFlavor from '../components/AuthLinkFlavor';
import GithubLoginButton from '../components/GithubLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { InterMediumInfo, MediumTopic } from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout';

const Signup = () => {
  return (
    <div className="auth-container row signup">
      <div className="column flex-1">
        <AuthLinkFlavor type="up" />
        <MediumTopic>Welcome, join us!</MediumTopic>
      </div>
      <div className="column flex-1">
        <AuthLinkFlavor type="down" />
        <div className="rel column">
          <LynxLogoDetailNoCircle
            style={{ width: 300, height: 300 }}
            strokeWidth={2}
          />
          <InterMediumInfo
            style={{
              width: 200,
              marginTop: '-50px',
            }}
          >
            Share, watch, explore the web with Lynx
          </InterMediumInfo>
        </div>
        <GithubLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};
Signup.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <NextSeo title="Signin" description="Sign in to your account." />

    {page}
  </AuthLayout>
);
export default Signup;
