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
        <SpecialLinkIcon style={{ transform: `rotate(30deg)` }} />
        <SpecialLinkIcon
          style={{
            left: 200,
            top: 80,
            transform: `rotate(80deg)`,
            width: 60,
            height: 60,
          }}
        />
        <SpecialLinkIcon
          style={{
            left: 120,
            top: 200,
            transform: `rotate(20deg)`,
            width: 110,
            height: 110,
          }}
        />
        <SpecialLinkIcon
          style={{
            left: 30,
            top: 320,
            transform: `rotate(100deg)`,
            width: 50,
            height: 50,
          }}
        />
        <SpecialLinkIcon
          style={{
            left: 130,
            top: 430,
            transform: `rotate(160deg)`,
            width: 90,
            height: 90,
          }}
        />
        <SpecialLinkIcon
          style={{
            left: -20,
            top: 560,
            transform: `rotate(70deg)`,
            width: 90,
            height: 90,
          }}
        />
        <SpecialLinkIcon
          style={{
            left: 300,
            top: 560,
            transform: `rotate(30deg)`,
            width: 55,
            height: 55,
          }}
        />
      </SpecialBackgroundColumn>

      <SpecialBackgroundColumn>
        <SpecialLinkIcon style={{ transform: `rotate(70deg)` }} />
        <SpecialLinkIcon
          style={{
            right: 200,
            top: 80,
            transform: `rotate(20deg)`,
            width: 60,
            height: 60,
          }}
        />
        <SpecialLinkIcon
          style={{
            right: 120,
            top: 200,
            transform: `rotate(80deg)`,
            width: 110,
            height: 110,
          }}
        />
        <SpecialLinkIcon
          style={{
            right: 30,
            top: 320,
            transform: `rotate(0deg)`,
            width: 50,
            height: 50,
          }}
        />
        <SpecialLinkIcon
          style={{
            right: 130,
            top: 430,
            transform: `rotate(100deg)`,
            width: 90,
            height: 90,
          }}
        />
        <SpecialLinkIcon
          style={{
            right: -20,
            top: 560,
            transform: `rotate(30deg)`,
            width: 90,
            height: 90,
          }}
        />
        <SpecialLinkIcon
          style={{
            right: 300,
            top: 560,
            transform: `rotate(70deg)`,
            width: 55,
            height: 55,
          }}
        />
      </SpecialBackgroundColumn>
    </SpecialBackgroundContainer>
  );
};

export default SpecialBackground;
