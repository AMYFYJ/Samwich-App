import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import homeIcon from '../assets/NavBar/donut.png';
import forkIcon from '../assets/NavBar/fork.png';
import inventoryIcon from '../assets/NavBar/fridge.png';
import { Home } from './screens/Home';
import { Recipes } from './screens/Recipes';
import { Inventory } from './screens/Inventory';
import RecipeDetail from './screens/RecipeView';
import RecipeAdjust from './screens/RecipeAdjust';
import RecipeCompletionScreen from './screens/Congrats';
import { RootStackParamList } from '../types/navigation';

// bottom navigation bar: Home, Recipes, Inventory
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

// Overall app navigation
const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    RecipeDetail: {
      screen: RecipeDetail,
      options: {
        headerShown: false,
      },
    },
    RecipeAdjust: {
      screen: RecipeAdjust,
      options: {
        headerShown: false,
      },
    },
    Congrats: {
      screen: RecipeCompletionScreen,
      options: {
        headerShown: false,
      },
    },
    // Settings: {
    //   screen: Settings,
    //   options: ({ navigation }) => ({
    //     presentation: 'modal',
    //     headerRight: () => (
    //       <HeaderButton onPress={navigation.goBack}>
    //         <Text>Close</Text>
    //       </HeaderButton>
    //     ),
    //   }),
    // },
    // NotFound: {
    //   screen: NotFound,
    //   options: {
    //     title: '404',
    //   },
    //   linking: {
    //     path: '*',
    //   },
    // },
  },
});

export const Navigation = createStaticNavigation(RootStack);

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
