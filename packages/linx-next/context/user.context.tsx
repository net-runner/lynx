import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { getUser } from '../helpers/user';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { User } from '@prisma/client';

export interface UserContext {
  user?: User;
  authenticate: (newToken: string) => Promise<void>;
  logout: ({ redirectLocation: string }) => void;
  setRedirect: (url: string) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
}

export const UserContext = createContext<UserContext>(null);

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUser must be used within UserContext provider');
  }
  return user;
};

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [redirect, setRedirect] = useState<string>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  const logout = ({ redirectLocation }) => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
    setIsLoading(false);
    console.log('Redirecting');
    router.push(redirectLocation || '/login');
  };

  const authenticate = async (token) => {
    setIsLoading(true);
    // authenticateAPI(token);
    try {
      const newUser = await getUser();
      setUser(newUser);
      // Cookies.set('access_token', token);
    } catch (error) {
      console.log({ error });
      // unauthenticateAPI();
      setUser(null);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) return;
    authenticate(token);
  }, []);

  //For debug only
  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(router.route);
    if (isAuthenticated) {
      if (router.route === ('/signin' || '/signup')) {
        router.push('/home');
      }
    }
  }, [router, isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        authenticate,
        logout,
        setRedirect,
        isLoading,
        isAuthenticated,
        token: Cookies.get('refresh_token'),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
