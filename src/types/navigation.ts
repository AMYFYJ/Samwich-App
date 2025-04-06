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
    calories: string;
    protein: string;
    carbohydrates: string;
    fats: string;
    fiber: string;
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
  RecipeDetails: {
    recipeData: RecipeData;
  };
  RecipeAdjust: {
    recipeData: RecipeData;
  };
}; 