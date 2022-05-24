import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  border-radius: 1rem;
  &.up {
    left: 20px;
    top: 0;
  }
  &.down {
    right: 10px;
    bottom: 0;
  }
`;
export const SpecialLinkIcon = styled(LinkIcon)`
  width: 55px;
  height: 55px;
  transform: rotate(-45deg);
  margin-right: 10px;
`;
