import { ImageSourcePropType } from 'react-native';

export type RecipeData = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  uses: string;
  serves: number;
  consume: string;
  ingredients: string[];
  macronutrients: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    fiber: number;
  };
  instructions: string[];
};

export type HomeTabsParamList = {
  Home: undefined;
  Recipes: undefined;
  Inventory: undefined;
  Congrats: {
    recipeData: RecipeData;
  };
  SavedRecipes: undefined;
  SuggestedRecipes: undefined;
  CompletedRecipes: undefined;
};

export type RootStackParamList = {
  HomeTabs: { screen?: keyof HomeTabsParamList; params?: any };
  RecipeView: {
    recipeData: RecipeData;
  };
  RecipeAdjust: {
    recipeData: RecipeData;
  };
}; 