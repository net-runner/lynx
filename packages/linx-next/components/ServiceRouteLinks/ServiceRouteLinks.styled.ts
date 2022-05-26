import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  border-radius: 1rem;
  bottom: 3rem;
  left: 0.5rem;
  font-size: 1.5rem;
  & > a {
    margin-right: 0.5rem;
    opacity: 0.2;
  }
`;
