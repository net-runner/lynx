import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-color: rgba(249, 249, 249, 0.25);
  border-width: 0.1rem;
  height: 4rem;
  width: 30rem;
  padding: 0.5rem 3rem;
  border-radius: 1.5rem;
  color: #f9f9f9;
  font-weight: bold;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
  margin-top: 4rem;
  & > svg {
    margin-right: 2rem;
  }
`;
