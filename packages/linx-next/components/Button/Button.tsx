import React, { MouseEventHandler } from 'react';
import * as S from './Button.styled';

interface Props {
  children?: JSX.Element | string;
  onClick?: MouseEventHandler;
}

const Button:React.FC<Props> = ({ children, onClick }) => (
  <S.Button onClick={onClick}>{children}</S.Button>
);
export default Button;
