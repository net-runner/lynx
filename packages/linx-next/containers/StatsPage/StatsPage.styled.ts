import styled from 'styled-components';
import { LynxLogoDetail } from '../../assets/icons';

export const Wrapper = styled.div`
  z-index: 2;
  text-align: start;
  position: relative;
  padding: 5rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
`;

export const Info = styled.p`
  font-size: 2.5rem;
  font-family: Inter, serif;
  font-weight: normal;
  line-height: 160%;
  text-align: start;
  margin: 0 1rem;
`;

export const Logo = styled(LynxLogoDetail)`
  width: 15rem;
  height: 15rem;
  position: absolute;
  top: -10rem;
`;
