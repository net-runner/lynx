import MainLayout from '../../layouts/MainLayout';
import React, { ReactElement } from 'react';

const TagName = () => {
  return <div>TagName</div>;
};
TagName.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default TagName;
