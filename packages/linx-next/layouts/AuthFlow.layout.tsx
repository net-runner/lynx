import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const Content = styled.div`
  display: flex;
  flex: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const AuthFlowLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  );
};

export default AuthFlowLayout;
