import styled from 'styled-components';
import { LynxLogoDetail } from '../../assets/icons';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 38rem;
  margin: 5rem auto;
  padding: 0 7rem;
  border-radius: 3.3rem;
  background-color: ${({ theme }) => theme.background};
`;

export const Title = styled.h1`
  margin: 1rem 0 2rem;
  padding: 0 2rem;
  font-family: 'Segoe UI', serif;
  font-size: 2.8rem;
  text-align: center;
  font-weight: bold;
`;

export const Logo = styled(LynxLogoDetail)`
  width: 10rem;
  height: 10rem;
  margin: 2rem 0 1rem;
`;
