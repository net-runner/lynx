import React, { MouseEventHandler } from 'react';
import * as S from './Button.styled';

interface Props {
  children?: JSX.Element | string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<Props> = ({ children, onClick, type }) => (
  <S.Button type={type} onClick={onClick}>
    {children}
  </S.Button>
);
export default Button;
