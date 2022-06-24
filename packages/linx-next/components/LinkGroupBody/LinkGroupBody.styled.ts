import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 3rem 2rem;
  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.background};
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

export const TagListContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;
