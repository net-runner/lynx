import Link from 'next/link';
import styled from 'styled-components';

export const Header = styled.header`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background};
  padding: 0 5rem;
  height: 8rem;
  font-family: Inter, serif;
`;

export const HeaderTextLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-family: Inter, serif;
  font-weight: normal;
`;

export const Nav = styled.nav`
  display: flex;
  text-align: center;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  a {
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
  & button {
    height: 3rem;
  }
  & svg {
    display: flex;
    align-self: center;
  }
`;
