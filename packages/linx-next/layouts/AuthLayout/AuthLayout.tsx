import SpecialBackground from '../../components/SpecialBackground';
import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Header from '../Header';
import ServiceRouteLinks from '../../components/ServiceRouteLinks';

const Content = styled.div`
  display: flex;
  flex: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const AuthLayout = ({
  type,
  children,
}: {
  type?: 'signin' | 'signup';
  children;
}) => {
  return (
    <Wrapper>
      <Header type={type} />
      <Content>{children}</Content>
      <Footer />
      <ServiceRouteLinks />
      <SpecialBackground />
    </Wrapper>
  );
};

export default AuthLayout;
