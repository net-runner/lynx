import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
`;

export const TagContainer = styled.div<{ selected: boolean }>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.primary : theme.backgroundSecondary};
  margin: 0.5rem;
  border-radius: 0.3rem;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  & div {
    display: inline-block;
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;
    height: 100%;
  }
`;
