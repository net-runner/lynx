import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
`;

export const TagContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
`;
