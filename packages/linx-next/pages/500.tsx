import AuthLayout from '../layouts/AuthLayout';

export default function Custom500() {
  return (
    <AuthLayout>
      <div className="place-self-center">
        <h1>500 - Server-side error occurred</h1>
      </div>
    </AuthLayout>
  );
}
