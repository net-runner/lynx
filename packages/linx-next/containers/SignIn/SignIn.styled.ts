import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 38rem;
  margin: 0 auto;
  padding: 5rem 0 3rem;
  border-radius: 3.3rem;
  background-color: ${({ theme }) => theme.highlight};

  & button {
    width: 300px;
    height: 40px;
    margin-top: 20px;
  }

  & input {
    margin-top: 10px;
    width: 300px;
  }

  & form label {
    margin-bottom: 10px;
  }
`;
