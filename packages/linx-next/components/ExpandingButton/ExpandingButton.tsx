import React from 'react';
import * as S from './ExpandingButton.styled';
interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  text: string;
  type?: 'small';
}
const ExpandingButton = ({ onClickHandler, text, type }: Props) => {
  return (
    <S.AddWrapper onClick={onClickHandler}>
      <S.AddContainer type={type}>
        <S.IconWrapper type={type}>
          <S.AddIco type={type} />
        </S.IconWrapper>
        <S.AddText type={type}>{text}</S.AddText>
      </S.AddContainer>
    </S.AddWrapper>
  );
};

export default ExpandingButton;
