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
import { RecipeCategory } from './screens/Recipes/RecipeCategory';
import { Inventory } from './screens/Inventory';
import RecipeView from './screens/RecipeView';
import RecipeAdjust from './screens/RecipeAdjust';
import RecipeCompletionScreen from './screens/Congrats';
import { RootStackParamList } from '../types/navigation';
import SavedRecipes from './screens/Recipes/SavedRecipes';
import SuggestedRecipes from './screens/Recipes/SuggestedRecipes2';  // change this to switch versions of suggested recipes screen
import CompletedRecipes from './screens/Recipes/CompletedRecipes';

const RecipesStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false, 
  },
  screens: {
    RecipeCategory: {
      screen: RecipeCategory,
    },
    SavedRecipes: {
      screen: SavedRecipes,
    },
    CompletedRecipes: {
      screen: CompletedRecipes,
      },
    SuggestedRecipes: {
      screen: SuggestedRecipes,
    },
  }
});

// bottom navigation bar: Home, Recipes, Inventory
const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    tabBarActiveTintColor: '#114641', // theme dark green
    tabBarInactiveTintColor: '#A8BBB9', 
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        headerShown: false,
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
      screen: RecipesStack,
      options: {
        headerShown: false,
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
        headerShown: false,
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
    Congrats: {
      screen: RecipeCompletionScreen,
      options: {
        tabBarButton: () => null,  // no icon for this screen on nav bar
        tabBarItemStyle: { display: 'none' },  // maintains the same tab layout
        headerShown: false,
      },
    },
    // SuggestedRecipes: {
    //   screen: SuggestedRecipes,
    //   options: {
    //     headerShown: false,
    //   },
    // },
    
    
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
    RecipeView: {
      screen: RecipeView,
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
