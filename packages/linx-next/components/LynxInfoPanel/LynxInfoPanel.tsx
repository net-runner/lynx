import React from 'react';
import * as S from './LynxInfoPanel.styled';
import AuthLinkFlavor from '../AuthLinkFlavor';

interface Props {
  text: string;
}
const LynxInfoPanel: React.FC<Props> = ({ text }) => (
  <S.Wrapper>
    <AuthLinkFlavor type={'relative'} />
    <S.Logo />
    <S.Title>{text}</S.Title>
    <AuthLinkFlavor type={'relative'} />
  </S.Wrapper>
);

export default LynxInfoPanel;
