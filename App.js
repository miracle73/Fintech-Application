import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import AppNavigation from './components/navigation';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './utils/AuthContext';
import * as Updates from 'expo-updates';
import {  TouchableOpacity } from 'react-native';


export default function App() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      alert(`Error fetching update: ${error}`);
    }
  }

  useEffect(() => {
    async function prepare() {
      try {

        await SplashScreen.preventAutoHideAsync();

        await new Promise(resolve => setTimeout(resolve, 1000));
        await onFetchUpdateAsync(); // Check for updates right after the splash screen
      } catch (e) {
        console.warn(e);
      } finally {

        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <>
      <AuthProvider>
        {/* <TouchableOpacity onPress={() => onFetchUpdateAsync()}> */}
          <AppNavigation />
        {/* </TouchableOpacity> */}

      </AuthProvider>

      {/* <StatusBar style='light' /> */}
    </>

  );
}

