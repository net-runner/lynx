import styled from 'styled-components';

export const SmallAuthText = styled.p`
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  font-weight: 400;
`;

export const AuthImportantText = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.6rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;
