import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  padding: 0.5rem 3rem;
  border-radius: 1rem;
  color: #000;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: 'Lato', sans-serif;
  white-space: nowrap;
`;
