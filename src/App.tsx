import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FoodProvider } from './context/FoodContext';
import { MacrosProvider } from './context/MacrosContext';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/NavBar/donut.png'),
  require('./assets/NavBar/fork.png'),
  require('./assets/NavBar/fridge.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <FoodProvider>
      <MacrosProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation
          linking={{
            enabled: 'auto',
            prefixes: [
              // Change the scheme to match your app's scheme defined in app.json
              'samwich://',
            ],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </GestureHandlerRootView>
      </MacrosProvider>
    </FoodProvider>
  );
}
