import React, { useState } from 'react';
import * as S from './Footer.styled';

const Footer = () => {
  const [isShown, setIsShown] = useState(false);
  const emote = isShown ? '🦊' : '❤';
  return (
    <S.Footer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div>
        made with {emote} by{' '}
        <a href="https://github.com/net-runner">@net-runner</a> &{' '}
        <a href="https://github.com/przemec">@przemec</a>
      </div>
    </S.Footer>
  );
};

export default Footer;
