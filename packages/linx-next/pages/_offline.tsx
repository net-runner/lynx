//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import AuthLayout from '../layouts/AuthLayout/AuthLayout';

export default function Offline() {
  return (
    <AuthLayout>
      <h1>No connection or app is offline.</h1>
    </AuthLayout>
  );
}
