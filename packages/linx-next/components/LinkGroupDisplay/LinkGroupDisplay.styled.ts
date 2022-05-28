import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60rem;
  min-height: 30rem;
  margin: 1rem 0;
  background: ${({ theme }) => theme.backgroundSecondary};
`;

export const Header = styled.h1`
  font-family: 'Segoe UI', serif;
  font-weight: bold;
  text-align: center;
  line-height: 100%;
  font-size: 4rem;
`;

export const Info = styled.p`
  margin: 0 1rem;
  font-size: 2.5rem;
  font-family: Inter, serif;
  font-weight: normal;
  line-height: 160%;
  text-align: center;
`;
