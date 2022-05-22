import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-color: rgba(249, 249, 249, 0.25);
  border-width: 1px;
  height: 40px;
  width: 300px;
  padding: 0.5rem 3rem;
  border-radius: 1rem;
  color: #f9f9f9;
  font-weight: bold;
  font-size: 1.4rem;
  line-break: none;
  font-family: 'Lato' sans-serif;
  white-space: nowrap;
  & > svg {
    margin-right: 20px;
  }
`;
