import Head from 'next/head';
import React from 'react';
import AuthLayout from '../layouts/AuthLayout';

const signin = () => {
  return (
    <>
      <Head>
        <title>Lynx - signin to account</title>
      </Head>
      <AuthLayout>
        <div className="mx-auto">
          <h1>Signin</h1>
        </div>
      </AuthLayout>
    </>
  );
};

export default signin;
