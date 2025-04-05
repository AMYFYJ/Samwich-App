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
import {RecipeCard } from '../../components/RecipeCard';

// images
import bellPepper from '../../assets/Food/bellpepper.png';
import egg from '../../assets/Food/egg.png';
import shrimp from '../../assets/Food/shrimp.png';
import salmon from '../../assets/Food/salmon.png';
import bokchoy from '../../assets/Food/bokchoy.png';
import broccoli from '../../assets/Food/broccoli.png';
import cucumber from '../../assets/Food/cucumber.png';
import milk from '../../assets/Food/milk.png';
import pumpkin from '../../assets/Food/pumpkin.png';
import tomato from '../../assets/Food/tomato.png';
import yogurt from '../../assets/Food/yogurt.png';
import avocado from '../../assets/Food/avocado.png';
import avocadoEggSandwich from '../../assets/Recipe/avocado sandwich.png';


// --- Sample Data ---
// Sample Macro Data
const currentMacros = {
  totalCalories: 1440,
  carbs: 136,
  protein: 48,
  fat:30,
  fiber: 36,
};

// Expiring Items Data
type ExpiringItem = {
  id: string;
  name: string;
  quantity: string;
  expiry: number;
  image: any;
};

const expiringItemsData: ExpiringItem[] = [
  { id: '1', name: 'Pumpkin', quantity: '2 left', expiry: 3, image: pumpkin },
  { id: '2', name: 'Eggs', quantity: '6 left', expiry: 1, image: egg },
  { id: '3', name: 'Greek Yoghurt', quantity: '1 left', expiry: 7, image: yogurt },
  { id: '4', name: 'Shrimp', quantity: '6 left', expiry: 1, image: shrimp },
  { id: '5', name: 'Salmon', quantity: '1 left', expiry: 2, image: salmon },
  { id: '6', name: 'Yellow Pepper', quantity: '1 left', expiry: -2, image: bellPepper },
  { id: '7', name: 'Bokchoy', quantity: '3 left', expiry: 5, image: bokchoy },
  { id: '8', name: 'Broccoli', quantity: '2 left', expiry: 7, image: broccoli },
  { id: '9', name: 'Cucumber', quantity: '3 left', expiry: 2, image: cucumber },
  { id: '10', name: 'Milk', quantity: '1 left', expiry: 2, image: milk },
  { id: '11', name: 'Tomato', quantity: '1 left', expiry: -1, image: tomato },
  { id: '12', name: 'Avocado', quantity: '1 left', expiry: 3, image: avocado },
];


// Quick Recipes Data
const quickRecipeData = {
    id: '1',
    name: 'Avocado Egg Sandwich',
    uses: 'Avocados, Eggs, White bread, Fresh thyme',
    consume: 'Consume within 2 days',
    image: avocadoEggSandwich,
};


// --- End Sample Data ---

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Home() {
  const navigation = useNavigation<NavigationProp>();

  // --- Render Function for Grid Item ---
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
            totalCalories={currentMacros.totalCalories}
            carbs={currentMacros.carbs}
            protein={currentMacros.protein}
            fat={currentMacros.fat}
            fiber={currentMacros.fiber}
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
        <RecipeCard
          name={quickRecipeData.name}
          uses={quickRecipeData.uses}
          consume={quickRecipeData.consume}
          imageSource={quickRecipeData.image}
          onUseNow={() => {
            navigation.navigate('RecipeDetail', {
              recipeData: {
                name: quickRecipeData.name,
                image: quickRecipeData.image,
                serves: 1,
                ingredients: quickRecipeData.uses.split(', '),
                macronutrients: {
                  calories: '452 cal',
                  protein: '9.5 g',
                  carbohydrates: '43 g',
                  fats: '29 g',
                  fiber: '7 g',
                },
                instructions: [
                  'Lightly toast the bread until golden and crisp.',
                  'Prepare the avocado by cutting it in half, removing the pit, and scooping the flesh into a bowl. Mash with a fork and season with salt and pepper.',
                  'Assemble the sandwich with the mashed avocado and fresh thyme.',
                ],
              }
            });
          }}
        />

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
    color: '#333', // Dark text color
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