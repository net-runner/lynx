import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { doLogout, getUser, signIn } from '../helpers/user';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import useSWR from 'swr';

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
}
const fetcher = (x) => fetch(x).then((res) => res.json());

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [redirect, setRedirect] = useState<string>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  const { data: cookies } = useSWR('/api/auth', fetcher);
  const { data: userr } = useSWR(
    cookies?.hasAuthCookies && '/api/auth/me',
    getUser
  );
  useEffect(() => {
    if (!user && userr) {
      setUser(userr);
    }
  }, [user, userr]);

  const login = async ({ email, password }) => {
    await signIn({ email, password });
    authenticate();
  };

  const logout = async ({ redirectLocation }) => {
    await doLogout();
    setUser(null);
    setIsLoading(false);
    console.log('Redirecting');
    router.push(redirectLocation || '/signin');
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
