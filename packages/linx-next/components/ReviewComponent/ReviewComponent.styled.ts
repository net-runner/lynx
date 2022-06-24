import Link from 'next/link';
import styled from 'styled-components';

export const ReviewRow = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  & a {
    font-weight: bold;
  }
`;

export const UserLink = styled(Link)``;
export const DescriptionBlock = styled.p``;
