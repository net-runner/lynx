import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const SpecialBackgroundContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  top: 15vh;
  width: 100%;
`;

export const SpecialBackgroundColumn = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  position: relative;
  &:nth-child(2) {
    align-items: flex-end;
  }
  & > svg {
    position: absolute;
  }
`;

export const SpecialLinkIcon = styled(LinkIcon)`
  width: 80px;
  height: 80px;
  transform: rotate(0);
  transition: 3s ease-in-out;
  &:hover {
    transition: 0.3s ease-in-out;
    transform: rotate(
      ${() => Math.floor(Math.random() * 360) + 180}deg
    ) !important;
  }
`;
