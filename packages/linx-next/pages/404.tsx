import AuthLayout from '../layouts/AuthLayout';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Lynx - 404 page not found</title>
      </Head>
      <AuthLayout>
        <div className="mx-auto">
          <h1>404 - Page Not Found</h1>
        </div>
      </AuthLayout>
    </>
  );
}
