import styled from 'styled-components';

interface Props {
  isSecondary?: boolean;
}

export const Button = styled.button<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 3rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
  background: transparent;
  height: 4rem;
  width: 30rem;
  transition: border-color 0.3s ease, filter 0.3s ease;
  ${({ theme, isSecondary }) => {
    if (isSecondary)
      return `
        background: transparent;
        border: 0.1rem solid rgba(249, 249, 249, 0.25);
        color: #f9f9f9;
      `;
    return `
      background: ${theme.primary};
      color: #000;
    `;
  }};
  &:hover {
    border-color: rgba(249, 249, 249, 0.5);
    filter: saturate(1.1) brightness(1.1);
  }
`;
