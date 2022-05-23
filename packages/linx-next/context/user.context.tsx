import { createContext, FC, useContext, useState, ReactNode } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { getUser } from '../helpers/user';

export interface UserContext {
  user?: any;
  setUser: (user?: any) => void;
}

export const UserContext = createContext<UserContext>(null);

export function useUser() {
  const { data, mutate, error } = useSWR('api_user', getUser);
  const loading = !data && !error;
  const loggedIn = !error && data;
  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
}

interface Props {
  children: ReactNode;
  initialUser?: any;
}

export const UserProvider: FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
