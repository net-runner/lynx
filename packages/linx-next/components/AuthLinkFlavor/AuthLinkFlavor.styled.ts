import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  border-radius: 1rem;
  &.up {
    left: 3rem;
    top: 0.4rem;
  }
  &.down {
    right: 1rem;
    bottom: 0;
  }
`;
export const SpecialLinkIcon = styled(LinkIcon)`
  width: 5.5rem;
  height: 5.5rem;
  transform: rotate(-45deg);
  margin-right: 1rem;
`;
