import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const NewTabIconWrapper = styled.a`
  display: none;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 1rem;
  }
`;

export const LContainer = styled.div`
  cursor: pointer;
  width: 100%;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover ${NewTabIconWrapper} {
    display: flex;
  }
`;

export const LinkIco = styled(LinkIcon)`
  transform: rotate(-45deg);
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
`;
