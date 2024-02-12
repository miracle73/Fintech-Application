import React, { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react';
import UserDetailsStore from './UserDetailsStore';

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const userDetailsStore = useLocalObservable(() => UserDetailsStore);

  useEffect(() => {
    userDetailsStore.loadUserDetails();
  }, []);

  return (
    <UserDetailsContext.Provider value={userDetailsStore}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};
