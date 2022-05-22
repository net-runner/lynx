import AuthLayout from '../layouts/AuthLayout';
import { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import { BigInformationSection } from '../components/Text/Text.styled';

const Custom404 = () => {
  return (
    <div className="error-route-container">
      <BigInformationSection>
        No page found with that address.
      </BigInformationSection>
    </div>
  );
};

Custom404.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo
        title="Page not found"
        description="Resource not found on the server."
      />
      {page}
    </AuthLayout>
  );
};
export default Custom404;
