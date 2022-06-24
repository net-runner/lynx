import styled from 'styled-components';

export const StarContainer = styled.div`
  background: ${({ theme }) => theme.backgroundTertiary};
  height: 2.4rem;
  line-height: 2.4rem;
  padding: 0 1rem 0 2rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
