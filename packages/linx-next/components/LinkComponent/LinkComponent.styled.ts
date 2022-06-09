import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const LinkIco = styled(LinkIcon)`
  transform: rotate(-45deg);
  align-self: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
`;

export const LContainer = styled.div`
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  flex: 1;
  align-self: flex-start;
`;
