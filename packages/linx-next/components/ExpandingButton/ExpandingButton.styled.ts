import styled from 'styled-components';
import { AddIcon } from '../../assets/icons';

export const Wrapper = styled.div`
  z-index: 10;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
  min-width: 0;
  min-height: 0;
  & button {
    width: 30rem;
    height: 4rem;
    margin-top: 2rem;
  }
`;

export const Form = styled.form`
  padding: 2rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 4rem;
  margin: 0.4rem 0 1.2rem;
  padding: 0.5rem 1rem;
  border-color: rgba(249, 249, 249, 0.25);
  border-width: 0.1rem;
  border-radius: 1rem;
  background: transparent;
  color: #f9f9f9;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  padding: 2rem;
  border-radius: 4rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

export const AddContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  border-radius: 4rem;
  transform: translateX(calc(50% - 3.5rem));
  transition: transform 0.3s ease-in-out;
`;

export const AddIco = styled(AddIcon)`
  width: 3rem;
  height: 3rem;
`;

export const AddText = styled.div`
  cursor: pointer;
  height: 100%;
  line-height: 7rem;
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
