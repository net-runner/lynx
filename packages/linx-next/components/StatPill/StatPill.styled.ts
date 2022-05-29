import styled from 'styled-components';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 1rem 0 1.7rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.backgroundTertiary};
  color: ${({ theme }) => theme.white};
  & svg {
    fill: ${({ theme }) => theme.white};
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.5rem;
`;
