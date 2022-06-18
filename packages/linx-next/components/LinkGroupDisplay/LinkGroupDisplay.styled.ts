import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 80rem;
  min-height: 22rem;
  margin: 1rem 0 3rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border: 0.3rem solid ${({ theme }) => theme.backgroundSecondary};
  & > * {
    z-index: 3;
  }
`;
