import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../context/user.context';

const AuthGate = ({ children }) => {
  const { user, isLoading, setRedirect } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      //auth is initialized and there is no user
      if (!user) {
        // remember the page that user tried to access
        setRedirect(router.route);
        // redirect
        router.push('/signin');
      }
    }
  }, [isLoading, router, user, setRedirect]);

  if (isLoading) {
    return <h1>Application Loading</h1>;
  }

  // if auth initialized with a valid user show protected page
  if (!isLoading && user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGate;
