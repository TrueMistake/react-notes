import React, {createContext, useContext, useState} from 'react';
import {AuthInterface, UserInterface} from "../interface/auth.interface";

const AuthContext = createContext<AuthInterface | null>(null);

export function useAuth(): AuthInterface | null {
  return useContext(AuthContext);
}

const AuthProvider = ({children}: { children: React.ReactNode }): JSX.Element => {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState<UserInterface | null>(initialUser);

  const signIn = (newUser: UserInterface, callback: Function): void => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    callback();
  }

  const signOut = (callback: Function): void => {
    setUser(null);
    localStorage.removeItem('user');
    callback();
  }

  const val: AuthInterface = {
    signIn,
    signOut,
    user
  }

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;