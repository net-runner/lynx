import styled from 'styled-components';

export const Wrapper = styled.div<{ isReversed: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ isReversed }) => isReversed && "row-reverse"};
  height: 2.4rem;
  line-height: 2.4rem;
  padding: 0 1rem 0 2rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.backgroundTertiary};
  color: ${({ theme }) => theme.white};
  & svg {
    fill: ${({ theme }) => theme.white};
  }
  & > div:first-child {
    margin-left: ${({ isReversed }) => isReversed && "1.5rem"};
    margin-right: ${({ isReversed }) => !isReversed && "1.5rem"};
  }

`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
