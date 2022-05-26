import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  transform: translateY(-2.5rem);
`;

export const ErrorNumbers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  font-size: 15rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  transform: translateY(-5rem);

  & p:nth-child(2) {
    margin: 0 2.5rem;
    transform: translateY(2.5rem);
  }
`;
export const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
`;
