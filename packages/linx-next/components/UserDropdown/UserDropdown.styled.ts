import styled from 'styled-components';

export const RelativeContainer = styled.div`
  position: relative;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  & > svg {
    margin-left: 0.5rem;
    margin-top: 0.25rem;
  }
`;

export const DropdownContainer = styled.div`
  display: none;
  position: absolute;
  min-width: 10rem;
  top: 4rem;
  right: -0.1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #f9f9f9;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  text-align: start;

  &.open {
    display: block;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;

    left: auto;
    right: 0.2rem;
    height: 0;
    width: 0;
    pointer-events: none;
  }

  &::after {
    top: -1.85rem;
    right: 0.1rem;
    border: 1.1rem solid transparent;
    border-bottom-color: ${({ theme }) => theme.backgroundSecondary};
  }

  &::before {
    top: -1.95rem;
    /* transform: rotateZ(45deg); */
    border: 1rem solid transparent;
    border-bottom-color: #f9f9f9;

    /* z-index: -1; */
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(249, 249, 249, 0.25);
`;

export const DropDownLink = styled.div`
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
  padding: 0.5rem;
  cursor: pointer;
`;
