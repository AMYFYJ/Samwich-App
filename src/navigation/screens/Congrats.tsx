import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform // Import Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

// --- Import Reusable Components ---
// Adjust paths as needed
import { FoodItemCard } from '../../components/FoodItemCard';
import { RecipeCard } from '../../components/RecipeCard';
import { MacrosCard } from '../../components/MacroCard';
import { RecipeData } from '../../types/navigation';

import tomato from '../../assets/Food/tomato.png';
import avocado from '../../assets/Food/avocado.png';
import bread from '../../assets/Food/bread.png';
import pumpkinSoup from '../../assets/Recipe/pumpkin soup.png';

// Sample Macro Data
const currentMacros = {
    totalCalories: 1440,
    carbs: 136,
    protein: 48,
    fat:30,
    fiber: 36,
};

// Sample Ingredients Data
const ingredientsSampleData = [
  {
    name: "Avocado",
    image: avocado,
    quantity: "1 whole",
    expiry: 3
  },
  {
    name: "White Bread",
    image: bread,
    quantity: "2 slices",
    expiry: 5
  },
  {
    name: "Cherry Tomatoes",
    image: tomato,
    quantity: "6 pieces",
    expiry: 7
  }
];

// Sample Suggested Recipes Data
const sampleRecipeData: RecipeData = {
    name: 'Pumpkin Soup',
    image: pumpkinSoup,
    serves: 4,
    ingredients: ['Pumpkin', 'Chicken broth', 'Garlic', 'Onion', 'Salt', 'Pepper'],
    macronutrients: {
        calories: '120',
        protein: '2',
        carbohydrates: '20',
        fats: '4',
        fiber: '3'
    },
    instructions: [
        'Chop pumpkin into cubes',
        'Sauté garlic and onion',
        'Add pumpkin and broth',
        'Simmer until pumpkin is tender',
        'Blend until smooth'
    ]
};

type Props = {
  route: {
    params: {
      recipeData: RecipeData;
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RecipeCompletionScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { recipeData } = route.params;

  // --- Handlers ---
  const handleUseNowPress = (recipe: typeof sampleRecipeData) => {
    console.log(`Use now pressed for: ${recipe.name}`);
    // Add navigation to RecipeDetail screen
    navigation.navigate('RecipeDetail', { recipeData: recipe });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContainer}>
      {/* Status Bar */}
      {/* Need to add a "Home" button on top of the screen */}
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Congratulations!</Text>
        <Text style={styles.headerSubtitle}>You've just made {recipeData.name}!</Text>
      </View>

      {/* Macronutrient Chart Section */}
      <MacrosCard
          totalCalories={currentMacros.totalCalories}
          carbs={currentMacros.carbs}
          protein={currentMacros.protein}
          fat={currentMacros.fat}
          fiber={currentMacros.fiber}
          style={{
              borderRadius: 0,
              backgroundColor: '#355E3B' 
          }}
          titleStyle={{
              fontSize: 20,
              color: '#355E3B',  // no title shown here
              fontWeight: 'bold'
          }}
      />

      {/* Ingredients Used Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients Used</Text>
        {/* Use ScrollView for horizontal scrolling */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
        >
          {/* {recipeData.ingredients.map((ingredient, index) => ( */}
          {ingredientsSampleData.map((item, index) => (
            <View key={index} style={styles.foodItemCardWrapper}>
              <FoodItemCard
                image={item.image}
                name={item.name}
                quantity={item.quantity}
                expiry={item.expiry}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* View More Recipes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>View More Recipes</Text>
        <View style={styles.recipeCardWrapper}>
          <RecipeCard
            imageSource={sampleRecipeData.image}
            name={sampleRecipeData.name}
            uses={`Uses: ${sampleRecipeData.ingredients.join(', ')}`}
            consume="Consume within 5 days"
            onUseNow={() => handleUseNowPress(sampleRecipeData)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

// --- StyleSheet ---
const screenPadding = 20;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F0', 
  },
  scrollContainer: {
    paddingBottom: 40, // Add padding at the bottom
  },
  header: {
    backgroundColor: '#355E3B', // Dark greenish color from image
    paddingHorizontal: screenPadding,
    paddingTop: Platform.OS === 'ios' ? 100 : 40, // Adjust top padding for status bar
    paddingBottom: 8, // Space below text
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  // --- General Section Styles ---
  section: {
      marginTop: 20,
      paddingHorizontal: screenPadding,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 7,
  },
  // --- Horizontal Scroll for Ingredients ---
  horizontalScroll: {
      paddingRight: screenPadding, // Ensure last item isn't cut off
  },
  foodItemCardWrapper: {
      margin: -2, // Space between food cards
      width: 130,
      paddingTop: 10
  },
  // --- Recipe Card Styles ---
  recipeCardWrapper: {
      marginBottom: 20, // Space below each recipe card
  },
  });

export default RecipeCompletionScreen;
