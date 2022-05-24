import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import { BigInformationSection } from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout';

const Custom500 = () => {
  return (
    <div className="error-route-container column">
      <div className="error-number row">
        <p>5</p>
        <p>0</p>
        <p>0</p>
      </div>
      <BigInformationSection>Server-side error occurred</BigInformationSection>
    </div>
  );
};
Custom500.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo
        title="Serverside error"
        description="Server error occured refresh the page."
      />
      {page}
    </AuthLayout>
  );
};
export default Custom500;
