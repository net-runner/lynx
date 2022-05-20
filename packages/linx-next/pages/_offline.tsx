//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import Head from 'next/head';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

export default function Offline() {
  return (
    <>
      <Head>
        <title>Lynx - app offline</title>
      </Head>
      <AuthLayout>
        <h1>No connection or app is offline.</h1>
      </AuthLayout>
    </>
  );
}
