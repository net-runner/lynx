import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const SpecialBackgroundContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  z-index: -1;
  padding: 160px 40px;
  height: 100%;
  width: 100%;
  background-color: #16181e;
`;
export const SpecialBackgroundColumn = styled.div`
  display: flex;
  min-width: 400px;
  flex: 1;
  height: 100%;
  flex-direction: column;
  background-color: #16181e;
  position: relative;
  &:nth-child(2) {
    align-items: flex-end;
    z-index: -3;
  }
  & > svg {
    position: absolute;
  }
`;

export const SpecialLinkIcon = styled(LinkIcon)`
  width: 80px;
  height: 80px;
  transform: rotate(0);
  transition: 0.3s ease-out;
  &:hover {
    transform: rotate(-45deg);
    transition: 0.3s ease-out;
  }
`;
