import { GithubOutlineIcon } from '../../assets/icons';
import React from 'react';
import SocialButton from '../SocialButton';

const GithubLoginButton = () => (
  <SocialButton
    text="Sign in with GitHub"
    icon={<GithubOutlineIcon />}
    linkToAuth={'signin/github'}
  />
);

export default GithubLoginButton;
