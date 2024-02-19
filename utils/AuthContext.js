import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ... other functions for login, logout, etc.
  useEffect(() => {
    _autoLogin();
  }, []);

  const _autoLogin = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        // Logic to check if the user details are still valid (e.g., token is not expired)
        // If valid, set the user state
        setUser(JSON.parse(userDetails));
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
