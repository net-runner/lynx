//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import { LynxLogoDetail, NoConnectionIcon } from '../assets/icons';
import { BigInformationSection } from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const Offline = () => {
  return (
    <div className="error-route-container column">
      <div className="rel" style={{ marginBottom: 22 }}>
        <LynxLogoDetail style={{ width: 200, height: 200 }} />
        <NoConnectionIcon
          style={{ position: 'absolute', bottom: -10, right: -10 }}
        />
      </div>

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
