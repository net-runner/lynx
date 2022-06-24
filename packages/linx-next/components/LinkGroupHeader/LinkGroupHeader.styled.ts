import styled from 'styled-components';
import { LinkIcon, Lock } from '../../assets/icons';

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: 10rem;
  padding: 3rem 2rem;
  border-radius: 2rem 2rem 0 0;
  background: ${({ theme }) => theme.backgroundSecondary};
`;

export const LinkIco = styled(LinkIcon)`
  transform: rotate(-45deg);
`;

export const LockIco = styled(Lock)`
  height: 3rem;
  width: 3rem;
  margin-left: 0.5rem;
  transform: translateY(0.1rem);
  opacity: 0.3;
  color: ${({ theme }) => theme.white};
`;

export const HeaderLeftPart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;
  & > div:not(:first-child) {
    margin-left: 1.4rem;
  }
`;

export const HeaderRightPart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.6rem;

  & > a {
    display: inline-block;
    font-family: 'Segoe UI', serif;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > a:nth-child(1) {
    font-weight: 200;
    font-size: 3rem;
    max-width: 15rem;
  }
  & > a:nth-child(3) {
    font-weight: bold;
    font-size: 3rem;
    max-width: 32rem;
  }
`;

export const TitleDivider = styled.div`
  font-family: 'Segoe UI', serif;
  text-align: center;
  font-weight: normal;
  font-size: 2.5rem;
`;
