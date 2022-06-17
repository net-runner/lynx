import styled from 'styled-components';
import { AddIcon } from '../../assets/icons';

export const IconWrapper = styled.div<{ type?: string }>`
  cursor: pointer;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.type === 'small' ? '3rem' : '7rem')};
  padding: 2rem;
  border-radius: 4rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

export const AddContainer = styled.div<{ type?: string }>`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.type === 'small' ? '3rem' : '7rem')};
  border-radius: 4rem;
  transform: translateX(calc(50% - 3.5rem));
  transition: transform 0.3s ease-in-out;
`;

export const AddIco = styled(AddIcon)`
  width: ${(props) => (props.type === 'small' ? '1.5rem' : '3rem')};
  height: ${(props) => (props.type === 'small' ? '1.5rem' : '3rem')};
`;

export const AddText = styled.div<{ type?: string }>`
  cursor: pointer;
  height: 100%;
  line-height: ${(props) => (props.type === 'small' ? '3rem' : '7rem')};
  padding: 0 2rem 0 7rem;
  overflow: hidden;
  border-radius: 4rem;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  transform: translateX(-200%);
  transition: transform 0.3s ease-in-out;
`;

export const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${AddContainer} {
      transform: translateX(3.5rem);
    }
    ${AddText} {
      transform: translateX(-7rem);
    }
  }
`;
