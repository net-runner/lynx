import styled from 'styled-components';

export const Wrapper = styled.div<{ isInput: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg:not(:first-child) {
    margin-left: 0.2rem;
  }
  ${({ isInput }) => {
    return isInput === true ? 'cursor:pointer' : 'cursor:default';
  }}
`;
