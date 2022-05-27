import React from 'react';
import {
  SpecialBackgroundColumn,
  SpecialBackgroundContainer,
  SpecialLinkIcon,
} from './SpecialBackground.styled';

const SpecialBackground = () => {
  return (
    <SpecialBackgroundContainer>
      <SpecialBackgroundColumn>
        <SpecialLinkIcon
          style={{
            left: '3vw',
            top: '1vh',
            transform: `rotate(30deg)`,
            width: '8rem',
            height: '8rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            left: '21vw',
            top: '10vh',
            transform: `rotate(80deg)`,
            width: '6rem',
            height: '6rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            left: '12vw',
            top: '22vh',
            transform: `rotate(20deg)`,
            width: '11rem',
            height: '11rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            left: '2vw',
            top: '30vh',
            transform: `rotate(100deg)`,
            width: '5rem',
            height: '5rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            left: '13vw',
            top: '45vh',
            transform: `rotate(160deg)`,
            width: '9rem',
            height: '9rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            left: '2vw',
            top: '55vh',
            transform: `rotate(70deg)`,
            width: '9rem',
            height: '9rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            left: '26vw',
            top: '65vh',
            transform: `rotate(30deg)`,
            width: '5.5rem',
            height: '5.5rem',
          }}
        />
      </SpecialBackgroundColumn>

      <SpecialBackgroundColumn>
        <SpecialLinkIcon
          style={{
            right: '3vw',
            top: '1vh',
            transform: `rotate(70deg)`,
            width: '8rem',
            height: '8rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            right: '21vw',
            top: '10vh',
            transform: `rotate(20deg)`,
            width: '6rem',
            height: '6rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            right: '12vw',
            top: '22vh',
            transform: `rotate(80deg)`,
            width: '11rem',
            height: '11rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            right: '2vw',
            top: '30vh',
            transform: `rotate(0deg)`,
            width: '5rem',
            height: '5rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            right: '13vw',
            top: '45vh',
            transform: `rotate(100deg)`,
            width: '9rem',
            height: '9rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            right: '2vw',
            top: '55vh',
            transform: `rotate(30deg)`,
            width: '9rem',
            height: '9rem',
          }}
        />
        <SpecialLinkIcon
          style={{
            right: '26vw',
            top: '65vh',
            transform: `rotate(70deg)`,
            width: '5.5rem',
            height: '5.5rem',
          }}
        />
      </SpecialBackgroundColumn>
    </SpecialBackgroundContainer>
  );
};

export default SpecialBackground;
