import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 80rem;
  min-height: 22rem;
  margin: 1rem 0 3rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border: 0.3rem solid ${({ theme }) => theme.backgroundSecondary};
  & > * {
    z-index: 3;
  }
`;

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

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 3rem 2rem;
  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.background};
`;

export const LinkIco = styled(LinkIcon)`
  transform: rotate(-45deg);
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

export const HeaderLeftPart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
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

export const Description = styled.p`
  width: 100%;
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 0.75rem;
  line-height: 160%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -ms-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
`;

export const ImageContainer = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0.4;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
`;

export const ImageFade = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.backgroundSecondary} 60%,
    transparent
  );
`;
