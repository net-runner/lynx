import Link from 'next/link';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  height: 8rem;
  font-family: Inter;
`;

export const HeaderTextLink = styled(Link)`
  text-decoration: none;
  font-size: 20;
  font-family: Inter;
  font-weight: regular;
`;

export const Nav = styled.nav`
  display: flex;
  text-align: center;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  a {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`;
