import SpecialBackground from '../../components/SpecialBackground';
import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Header from '../Header';
import ServiceRouteLinks from '../../components/ServiceRouteLinks';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 11rem);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer />
      <ServiceRouteLinks />
      <SpecialBackground />
    </Wrapper>
  );
};

export default AuthLayout;
