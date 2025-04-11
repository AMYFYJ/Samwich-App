import React from 'react';
import {
  StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ImageSourcePropType
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

// import components
import { FoodItemCard } from '../../components/FoodItemCard';
import { MacrosCard } from '../../components/MacroCard';
import { RecipeCard } from '../../components/RecipeCard';

// import sample data
import foodItemsJson from '../../../sample_data/foods.json';
import recipesJson from '../../../sample_data/recipes.json';
import macrosJson from '../../../sample_data/Macros.json';
import imageMapping from '../../utils/imageMapping';


// Expiring Items Data
type ExpiringItem = {
  id: string;
  name: string;
  quantity: string;
  expiry: number;
  image: any;
};

// Transform the food items data to include actual image references
const expiringItemsData: ExpiringItem[] = foodItemsJson.foodItemsData.map(item => ({
  ...item,
  image: imageMapping[item.imageName]
}));


// Transform all recipes with proper image references
const allRecipes = recipesJson.recipeData.map(recipe => ({
  ...recipe,
  image: imageMapping[recipe.image]
}));

// Get the first two recipes for Quick Recipes section
const quickRecipes = allRecipes.slice(0, 2);

// --- End Sample Data ---

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Home() {
  const navigation = useNavigation<NavigationProp>();

  // --- Render Function for Grid Item of Food Items ---
  const renderExpiringItem = ({ item }: { item: ExpiringItem }) => (
    <FoodItemCard
        name={item.name}
        quantity={item.quantity}
        expiry={item.expiry}
        image={item.image}
    />
);
  // --- End Render Function ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        {/* === Today's Macros Section === */}
        <MacrosCard
            totalCalories={macrosJson.currentMacros.totalCalories}
            carbs={macrosJson.currentMacros.carbs}
            protein={macrosJson.currentMacros.protein}
            fat={macrosJson.currentMacros.fat}
            fiber={macrosJson.currentMacros.fiber}
        />

        {/* === Items Expiring Soon Section === */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Items Expiring Soon</Text>
          <FlatList
              data={expiringItemsData}
              renderItem={renderExpiringItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
              // Add styles for layout:
              contentContainerStyle={styles.gridContainer} // Padding around the whole grid
              columnWrapperStyle={styles.gridRow} // Style for each row
            />
          </View>

        {/* === Quick Recipes Section === */}
        <Text style={styles.sectionTitle}>Quick Recipes</Text>
        {quickRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            uses={recipe.uses}
            consume={recipe.consume}
            imageSource={recipe.image}
            macronutrients={recipe.macronutrients}
            instructions={recipe.instructions}
            onUseNow={() => {
              navigation.navigate('RecipeView', {
                recipeData: {
                  id: recipe.id,
                  name: recipe.name,
                  image: recipe.image,
                  serves: recipe.serves,
                  consume: recipe.consume,
                  uses: recipe.uses,
                  ingredients: recipe.uses.split(', '),
                  macronutrients: recipe.macronutrients,
                  instructions: recipe.instructions,
                }
              });
            }}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F0', // Light beige background for whole screen
  },
  scrollViewContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#114641', // Dark text color
    marginBottom: 15,
  },
  
  // Items Expiring Soon Section  

  gridContainer: {
    paddingHorizontal: 5, // Padding on the left/right of the entire grid
  },
  gridRow: {
      justifyContent: 'space-between', // Distributes items evenly in the row
      marginBottom: 2, // Small spacing between rows
  },
  
  // Quick Recipes Section
  recipeCardContainer: {
    backgroundColor: '#FFFAF5', // Lighter cream
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row', // Image and details side-by-side
    alignItems: 'center',
    shadowColor: '#000', // Basic shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 10, // Rounded square
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  recipeDetails: {
    flex: 1, // Take remaining space
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recipeUses: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
   recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  recipeConsume: {
    fontSize: 11,
    color: '#D32F2F', // Reddish color for urgency
    fontStyle: 'italic',
  },
  useNowButton: {
    backgroundColor: '#4A7C59', // Green button
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  useNowButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 12,
    fontWeight: 'bold',
  },
});