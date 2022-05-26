import styled from 'styled-components';

export const LandingHeader = styled.h1`
  font-family: 'Segoe UI', serif;
  font-weight: bold;
  text-align: center;
  line-height: 100%;
  font-size: 11rem;
  margin-bottom: 60px;
`;

export const BigInformationSection = styled.p`
  font-size: 2.5rem;
  font-family: Inter, serif;
  font-weight: normal;
  line-height: 160%;
  text-align: center;
  margin: 0 1rem;
`;

export const MediumTopic = styled.p`
  font-family: 'Segoe UI', serif;
  margin-top: 1rem;
  font-size: 2.8rem;
  text-align: center;
  font-weight: bold;
`;

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
