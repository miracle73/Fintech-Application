import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react'
import AppNavigation from './components/navigation';
import * as SplashScreen from 'expo-splash-screen';


export default function App() {

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Load your app's resources here (fonts, images, etc.)
        // Perform any other setup logic...

        // Artificially delay for demonstration purposes
        await new Promise(resolve => setTimeout(resolve,  1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Now that everything is prepared, hide the splash screen
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <>
      <AppNavigation />
      {/* <StatusBar style='light' /> */}
    </>

  );
}

