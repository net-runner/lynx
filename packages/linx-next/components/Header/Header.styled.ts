import Link from 'next/link';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
  text-align: center;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  display: flex;
  padding: 5px 30px 5px 30px;
  height: 40px;
  margin-top: 20px;
  font-family: Inter;
  & > div > a {
    font-weight: bold;
  }
  & > div {
    padding-top: 2px;
  }
`;

export const HeaderTextLink = styled(Link)`
  text-decoration: none;
  font-size: 20;
  font-family: Inter;
  font-weight: regular;
`;
