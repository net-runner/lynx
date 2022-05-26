import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 60rem;
  margin: 1rem auto 3rem;
  padding: 4rem 0;
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

export const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 0 2rem;
  &:nth-child(1) {
    padding-right: 0;
  }
  &:nth-child(2) {
    padding-left: 0;
  }
`;

export const Info = styled.div`
  font-size: 1.8rem;
  font-family: Inter, serif;
  text-align: center;
  font-weight: 400;
`;
