import { ImageSourcePropType } from 'react-native';

export type RecipeData = {
  name: string;
  image: ImageSourcePropType;
  serves: number;
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

export type RootStackParamList = {
  HomeTabs: undefined;
  RecipeDetail: {
    recipeData: RecipeData;
  };
  RecipeAdjust: {
    recipeData: RecipeData;
  };
  Congrats: {
    recipeData: RecipeData;
  };
}; 