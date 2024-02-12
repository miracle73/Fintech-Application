import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const navigation = useNavigation();

  const initialState = {
    token: null, // Add more authentication-related state here
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return { ...state, token: action.payload };
      case 'LOGOUT':
        return { ...initialState }; // Reset the state to initial state on logout
      // Add other cases for managing authentication state as needed
      default:
        return state;
    };
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check for token on app start or component mount
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token'); // Replace with your token retrieval method
      if (!token) {
        // Log user out if token is not available
        dispatch({ type: 'LOGOUT' });
        // You can add further logic to navigate to a login screen
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loggedInUser');
        await AsyncStorage.removeItem('userDetails');
        console.log('Logging out due to inactivity @Dispatch.');
        // navigation.navigate('Root');
      } else {
        dispatch({ type: 'SET_TOKEN', payload: token });
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };