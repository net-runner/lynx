import React, { ReactElement } from 'react';
import MainLayout from '../layouts/MainLayout';

//New linkgroup creation screen
const New = () => {
  return <div>new</div>;
};
New.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
New.requireAuth = true;
export default New;
