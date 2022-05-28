import MainLayout from '../../layouts/MainLayout';
import React, { ReactElement } from 'react';

const UserDashboard = () => {
  return <div>UserDashboard</div>;
};
UserDashboard.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default UserDashboard;
