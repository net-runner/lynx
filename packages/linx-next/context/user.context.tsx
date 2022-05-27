import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { getUser, signIn } from '../helpers/user';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { User } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

export interface UserContext {
  user?: User;
  authenticate: (newToken: string) => Promise<void>;
  logout: ({ redirectLocation: string }) => void;
  setRedirect: (url: string) => void;
  login: ({ email, password }: { email: string; password: string }) => void;
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
const fetcher = (x) => fetch(x).then((res) => res.json());

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [redirect, setRedirect] = useState<string>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  const { data } = useSWR('/api/auth', fetcher);

  useEffect(() => {
    if (data?.hasAuthCookies) {
      authenticate();
    }
  }, [data]);

  const login = async ({ email, password }) => {
    await signIn({ email, password });
    authenticate();
  };

  const logout = ({ redirectLocation }) => {
    setUser(null);
    setIsLoading(false);
    console.log('Redirecting');
    router.push(redirectLocation || '/login');
  };

  const authenticate = async () => {
    setIsLoading(true);
    // authenticateAPI(token);
    try {
      const newUser = await getUser();
      setUser(newUser);
      // Cookies.set('access_token', token);
      router.push(redirect || '/home');
    } catch (error) {
      console.log({ error });
      // unauthenticateAPI();
      setUser(null);
    }
    setIsLoading(false);
  };

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
        login,
        isLoading,
        isAuthenticated,
        token: Cookies.get('refresh_token'),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
