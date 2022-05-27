import { GoogleIcon } from '../../assets/icons';
import React from 'react';
import SocialButton from '../SocialButton';

const GoogleLoginButton = () => (
  <SocialButton
    text="Sign in with Google"
    icon={<GoogleIcon />}
    linkToAuth={'api/auth/signin/google'}
  />
);

export default GoogleLoginButton;
