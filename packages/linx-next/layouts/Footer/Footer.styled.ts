import styled from 'styled-components';

export const Footer = styled.footer`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  text-align: center;
  font-size: 1.2rem;
  font-family: Inter, serif;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  & > div > a {
    font-weight: 500;
    text-decoration: underline;
  }
`;
