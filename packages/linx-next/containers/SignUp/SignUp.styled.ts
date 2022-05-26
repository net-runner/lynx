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
    width: 30rem;
    height: 4rem;
    margin-top: 2rem;
  }
`;

export const Title = styled.h1`
  margin: 1.5rem 0;
  font-family: 'Segoe UI', serif;
  font-size: 2.8rem;
  text-align: center;
  font-weight: bold;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem;
  &:nth-child(1) {
    padding-right: 0.5rem;
  }
  &:nth-child(2) {
    padding-left: 0.5rem;
  }
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 4rem;
  margin: 0.4rem 0 1.2rem;
  padding: 0.5rem 1rem;
  border-color: rgba(249, 249, 249, 0.25);
  border-width: 0.1rem;
  border-radius: 1rem;
  background: transparent;
  color: #f9f9f9;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Info = styled.div`
  width: calc(100% - 6rem);
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-family: Inter, serif;
  text-align: center;
  font-weight: 400;
`;
