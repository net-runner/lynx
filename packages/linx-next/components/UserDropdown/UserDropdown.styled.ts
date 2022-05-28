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
  border: 1px solid;
  border-color: #f9f9f9;
  display: none;
  /* border-color: rgba(249, 249, 249, 0.25); */
  border-radius: 0.75rem;
  position: absolute;
  background-color: #21242d;
  top: 3rem;
  text-align: start;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

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
