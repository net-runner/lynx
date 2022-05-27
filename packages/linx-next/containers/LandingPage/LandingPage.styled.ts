import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 2;
  margin: 3rem 20vw;
`;

export const Header = styled.h1`
  font-family: 'Segoe UI', serif;
  font-weight: bold;
  text-align: center;
  line-height: 100%;
  font-size: 11rem;
  margin-bottom: 6rem;
`;

export const Info = styled.p`
  font-size: 2.5rem;
  font-family: Inter, serif;
  font-weight: normal;
  line-height: 160%;
  text-align: center;
  margin: 0 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4rem 22.5rem;

  & > button {
    height: 4.5rem;
  }

  & > button:nth-child(2n) {
    margin-left: 6rem;
  }
`;
