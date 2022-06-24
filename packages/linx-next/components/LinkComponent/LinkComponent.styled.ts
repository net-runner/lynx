import styled from 'styled-components';
import { LinkIcon } from '../../assets/icons';

export const NewTabIconWrapper = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  margin-left: 1rem;

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const DeleteIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  margin-left: 0.8rem;
`;

export const LContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    cursor: pointer;
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }

  &:hover {
    ${DeleteIconWrapper}, ${NewTabIconWrapper} {
      visibility: visible;
    }
  }
`;

export const LinkIco = styled(LinkIcon)`
  transform: rotate(-45deg);
  margin-right: 1rem;
`;
