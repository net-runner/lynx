import { ReactElement } from 'react';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import LandingPage from '../containers/LandingPage';

const Index = () => <LandingPage />;

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
