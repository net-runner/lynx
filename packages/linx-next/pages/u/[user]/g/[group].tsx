import MainLayout from '../../../../layouts/MainLayout';
import React, { ReactElement } from 'react';

const ShowGroupContent = () => {
  return <div>ShowGroupContent</div>;
};
ShowGroupContent.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default ShowGroupContent;
