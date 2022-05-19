import React, { useState } from 'react';
import { Footer as F } from './Footer.styled';

const Footer = () => {
  const [isShown, setIsShown] = useState(false);
  const emote = isShown ? '🦊' : '❤';
  return (
    <F
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div>
        made with {emote} by{' '}
        <a href="https://github.com/net-runner">@net-runner</a> &{' '}
        <a href="https://github.com/przemec">@przemec</a>
      </div>
    </F>
  );
};

export default Footer;
