import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import homeIcon from '../assets/NavBar/donut.png';
import forkIcon from '../assets/NavBar/fork.png';
import inventoryIcon from '../assets/NavBar/fridge.png';
import { Home } from './screens/Home';
import { Recipes } from './screens/Recipes';
import { Settings } from './screens/Settings';
import { Inventory } from './screens/Inventory';
import { NotFound } from './screens/NotFound';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={homeIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Recipes: {
      screen: Recipes,
      options: {
        title: 'Recipes',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={forkIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Inventory: {
      screen: Inventory,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={inventoryIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    // Profile: {
    //   screen: Profile,
    //   linking: {
    //     path: ':user(@[a-zA-Z0-9-_]+)',
    //     parse: {
    //       user: (value) => value.replace(/^@/, ''),
    //     },
    //     stringify: {
    //       user: (value) => `@${value}`,
    //     },
    //   },
    // },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
