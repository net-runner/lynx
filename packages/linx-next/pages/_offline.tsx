//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import { BigInformationSection } from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const Offline = () => {
  return (
    <div className="error-route-container">
      <BigInformationSection>
        Page not cached or Lynx is offline. Reconnect and refresh the app.
      </BigInformationSection>
    </div>
  );
};

Offline.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <NextSeo
        title="Lynx is offline"
        description="Resource not cached or application is offline."
      />
      {page}
    </AuthLayout>
  );
};
export default Offline;
