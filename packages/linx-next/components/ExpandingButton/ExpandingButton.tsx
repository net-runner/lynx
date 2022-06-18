import React from 'react';
import * as S from './ExpandingButton.styled';

interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  text: string;
  type: 'static' | 'dynamic';
  size: 'small' | 'big';
  site: 'right' | 'left';
}

const ExpandingButton = ({ onClickHandler, text, type, size, site }: Props) => (
  <S.ViewBox className={`${type} ${site}`}>
    <S.AddWrapper className={`${type} ${site}`}>
      <S.AddContainer buttonsize={size} site={site} onClick={onClickHandler}>
        <S.IconWrapper buttonsize={size}>
          <S.AddIco buttonsize={size} />
        </S.IconWrapper>
        <S.AddText buttonsize={size} site={site}>
          {text}
        </S.AddText>
      </S.AddContainer>
    </S.AddWrapper>
  </S.ViewBox>
);

export default ExpandingButton;
