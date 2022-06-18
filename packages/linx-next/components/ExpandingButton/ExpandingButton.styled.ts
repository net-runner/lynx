import styled from 'styled-components';
import { AddIcon } from '../../assets/icons';

//this file is kinda disgusting btw, I'm not rly proud of myself for doing this XD
//good luck with debugging

interface Props {
  type?: 'static' | 'dynamic';
  buttonsize?: 'small' | 'big';
  site?: 'right' | 'left';
}

export const ViewBox = styled.div<Props>`
  overflow: hidden;
  &.static {
    &.right {
      transform: translateX(-7rem);
    }
    &.left {
      transform: translateX(7rem);
    }
  }
`;

export const IconWrapper = styled.div<Props>`
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  border-radius: 4rem;
  height: ${({ buttonsize }) => (buttonsize === 'small' ? '3rem' : '7rem')};
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

export const AddContainer = styled.div<Props>`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4rem;
  transition: transform 0.3s ease-in-out;
  flex-direction: ${({ site }) => site === 'left' && 'row-reverse'};
  height: ${({ buttonsize }) => (buttonsize === 'small' ? '3rem' : '7rem')};
  transform: translateX(
    ${({ site }) =>
      site === 'left' ? 'calc(-50% + 3.5rem)' : 'calc(50% - 3.5rem)'}
  );
`;

export const AddIco = styled(AddIcon)<Props>`
  width: ${({ buttonsize }) => (buttonsize === 'small' ? '1.5rem' : '3rem')};
  height: ${({ buttonsize }) => (buttonsize === 'small' ? '1.5rem' : '3rem')};
`;

export const AddText = styled.div<Props>`
  height: 100%;
  overflow: hidden;
  border-radius: 4rem;
  transition: transform 0.3s ease-in-out;
  line-height: ${({ buttonsize }) =>
    buttonsize === 'small' ? '3rem' : '7rem'};
  padding: ${({ site }) =>
    site === 'left' ? '0 7rem 0 2rem' : '0 2rem 0 7rem'};
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  transform: translateX(${({ site }) => site !== 'left' && '-'}200%);
`;

export const AddWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:not(.static):hover {
    &.left ${AddContainer} {
      transform: translateX(-3.5rem);
    }
    &.left ${AddText} {
      transform: translateX(7rem);
    }
    &.right ${AddContainer} {
      transform: translateX(3.5rem);
    }
    &.right ${AddText} {
      transform: translateX(-7rem);
    }
  }
  &.static {
    ${AddContainer} {
      transform: translateX(0);
    }
    &.right {
      transform: translateX(7rem);
      justify-content: flex-start;
    }
    &.left {
      transform: translateX(-7rem);
      justify-content: flex-end;
    }
  }
  &.static:hover {
    &.right {
      ${AddText} {
        transform: translateX(-7rem);
      }
    }
    &.left {
      ${AddText} {
        transform: translateX(7rem);
      }
    }
  }
`;
