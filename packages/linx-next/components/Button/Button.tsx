import React, { MouseEventHandler } from 'react';
import * as S from './Button.styled';

interface Props {
  children?: JSX.Element | string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  isSecondary?: boolean;
}

const Button: React.FC<Props> = ({ children, onClick, type, isSecondary }) => (
  <S.Button type={type} onClick={onClick} isSecondary={isSecondary}>
    {children}
  </S.Button>
);
export default Button;
