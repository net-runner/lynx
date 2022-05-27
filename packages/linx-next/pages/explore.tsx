import { ReactElement } from 'react';
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../containers/LandingPage';

const Explore = () => <LandingPage />;

Explore.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Explore;

