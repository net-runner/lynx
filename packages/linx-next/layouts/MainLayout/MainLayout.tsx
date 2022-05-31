import React from 'react';
import styled from 'styled-components';
import Header from '../Header';

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

const MainLayout = ({ children }: { children }) => (
  <Wrapper>
    <Header />
    <Content>{children}</Content>
  </Wrapper>
);

export default MainLayout;
