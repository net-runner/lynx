import React from 'react';
import * as S from './ExpandingButton.styled';
interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  text: string;
}
const ExpandingButton = ({ onClickHandler, text }: Props) => {
  return (
    <S.AddWrapper onClick={onClickHandler}>
      <S.AddContainer>
        <S.IconWrapper>
          <S.AddIco />
        </S.IconWrapper>
        <S.AddText>{text}</S.AddText>
      </S.AddContainer>
    </S.AddWrapper>
  );
};

export default ExpandingButton;
