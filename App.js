import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import AppNavigation from './components/navigation';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './utils/AuthContext';


export default function App() {

  useEffect(() => {
    async function prepare() {
      try {

        await SplashScreen.preventAutoHideAsync();

        await new Promise(resolve => setTimeout(resolve, 1000));
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
        <AppNavigation />
      </AuthProvider>

      {/* <StatusBar style='light' /> */}
    </>

  );
}

