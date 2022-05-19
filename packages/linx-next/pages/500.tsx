import AuthLayout from '../layouts/AuthLayout';

export default function Custom500() {
  return (
    <AuthLayout>
      <h1>500 - Server-side error occurred</h1>
    </AuthLayout>
  );
}
