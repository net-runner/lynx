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
  padding: 3rem 3rem;
  margin: 1rem 0;
  border-radius: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  & > * {
    z-index: 3;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 10rem;
  width: 100%;
`;

export const LinkIco = styled(LinkIcon)`
  transform: rotate(-45deg);
`;

export const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > div:not(:first-child) {
    margin-left: 1rem;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  & > a {
    font-family: 'Segoe UI', serif;
    text-align: center;
    line-height: 100%;
  }
  & > a:first-child {
    font-weight: bold;
    font-size: 4rem;
  }
  & > a:last-child {
    font-weight: normal;
    font-style: italic;
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

export const Description = styled.p`
  width: 70%;
  font-size: 1.8rem;
  font-weight: normal;
  line-height: 160%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -ms-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  line-clamp: 4;
  -webkit-line-clamp: 4;
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
