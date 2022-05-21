import SpecialBackground from '../../components/SpecialBackground';
import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Header from '../Header';

const Content = styled.div`
  display: flex;
  flex: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer />
      <SpecialBackground />
    </Wrapper>
  );
};

export default AuthLayout;
