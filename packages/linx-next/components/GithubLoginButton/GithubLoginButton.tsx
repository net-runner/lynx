import { GithubIcon } from '../../assets/icons';
import React from 'react';
import SocialButton from '../SocialButton';

const GithubLoginButton = () => (
  <SocialButton
    text="Sign in with GitHub"
    icon={<GithubIcon />}
    linkToAuth={'signin/github'}
  />
);

export default GithubLoginButton;
