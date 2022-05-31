import React from 'react';
import * as S from './AllListsFetchedPanel.styled';
import AuthLinkFlavor from '../AuthLinkFlavor';

const AllListsFetchedPanel = () => (
  <S.Wrapper>
    <AuthLinkFlavor type={'relative'} />
    <S.Logo />
    <S.Title>
      Seems like You&apos;ve gone so far that sadly we have nothing else to show
      You
    </S.Title>
    <AuthLinkFlavor type={'relative'} />
  </S.Wrapper>
);

export default AllListsFetchedPanel;
