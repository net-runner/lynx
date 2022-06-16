import styled from 'styled-components';

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
