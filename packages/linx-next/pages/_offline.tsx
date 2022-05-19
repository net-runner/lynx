//Static page for handling app being offline or as a fallback for non WebWorker cached routes

import AuthFlowLayout from '../layouts/AuthFlow.layout';

export default function Offline() {
  return (
    <AuthFlowLayout>
      <h1>No connection or app is offline.</h1>
    </AuthFlowLayout>
  );
}
