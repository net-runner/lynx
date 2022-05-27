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
  background-color: ${({ theme }) => theme.backgroundSecondary};

  & button {
    width: 30rem;
    height: 4rem;
    margin-top: 2rem;
  }

  & input {
    margin-top: 1rem;
    width: 30rem;
  }

  & form label {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  margin: 1rem 0 2rem;
  font-family: 'Segoe UI', serif;
  font-size: 2.8rem;
  text-align: center;
  font-weight: bold;
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 4rem;
  margin-bottom: 2rem;
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
