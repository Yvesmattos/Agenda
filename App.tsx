import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';


import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import AppLoading from 'expo-app-loading';

export default function App() {
  const isLoadingComplete = useCachedResources();

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular, OpenSans_700Bold, Roboto_100Thin, Roboto_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={"light"} />
        <StatusBar backgroundColor={"white"} />
      </SafeAreaProvider>
    );
  }
}
