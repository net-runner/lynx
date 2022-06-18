import styled from 'styled-components';

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

export const TextArea = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  max-width: 30rem;
  min-width: 30rem;
  min-height: 6rem;
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
