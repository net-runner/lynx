import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { doLogout, getUser, signIn } from '../api/user';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import axios from 'axios';
export interface UserContext {
  user?: User;
  authenticate: (newToken: string) => Promise<void>;
  logout: ({ redirectLocation: string }) => void;
  setRedirect: (url: string) => void;
  login: ({ email, password }: { email: string; password: string }) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
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
  initialUser?: User;
}
const fetcher = (x) => fetch(x).then((res) => res.json());

export const UserProvider: FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState<User>(initialUser || null);
  const [redirect, setRedirect] = useState<string>(null);
  const [hasLogout, setHasLogout] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  const { data: cookies } = useSWR('/api/auth', fetcher);
  const { data: userr } = useSWR(
    cookies?.hasAuthCookies && '/api/auth/me',
    getUser
  );
  useEffect(() => {
    if (!user && userr && !hasLogout) {
      setUser(userr);
    }
  }, [user, userr, hasLogout]);

  const login = async ({ email, password }) => {
    setHasLogout(false);
    await signIn({ email, password });
    authenticate();
  };

  const logout = async ({ redirectLocation }) => {
    await doLogout();
    await axios.get(`${process.env.FRONTEND_URL}/api/logout`);
    setHasLogout(true);
    setUser(undefined);
    setIsLoading(false);
    router.push(redirectLocation || '/signin');
    // router.reload();
  };

  const authenticate = async () => {
    setIsLoading(true);
    // authenticateAPI(token);
    try {
      const newUser = await getUser();
      setUser(newUser);
      // Cookies.set('access_token', token);
      router.push(redirect || '/explore');
    } catch (error) {
      console.log({ error });
      // unauthenticateAPI();
      setUser(null);
    }
    setIsLoading(false);
  };

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
