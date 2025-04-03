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

// Import the navigation types from index.tsx
export type { RootStackParamList } from '../navigation'; 