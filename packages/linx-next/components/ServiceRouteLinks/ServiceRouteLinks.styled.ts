import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  border-radius: 1rem;
  bottom: 30px;
  left: 5px;
  font-size: 15px;
  & > a {
    margin-right: 5px;
    opacity: 0.3;
  }
`;
