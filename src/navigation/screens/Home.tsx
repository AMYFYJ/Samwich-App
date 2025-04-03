import React from 'react';
import {
  StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

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
  expiry: string;
  image: any;
};

const expiringItemsData: ExpiringItem[] = [
  { id: '1', name: 'Pumpkin', quantity: '2 left', expiry: 'Expires in 3 days', image: pumpkin },
  { id: '2', name: 'Eggs', quantity: '6 left', expiry: 'Expires in 1 day', image: egg },
  { id: '3', name: 'Greek Yoghurt', quantity: '2 left', expiry: 'Expires in 2 days', image: yogurt },
  { id: '4', name: 'Shrimp', quantity: '6 left', expiry: 'Expires in 1 day', image: shrimp },
  { id: '5', name: 'Salmon', quantity: '1 left', expiry: 'Expires in 2 days', image: salmon },
  { id: '6', name: 'Yellow Pepper', quantity: '1 left', expiry: 'Expires in 2 days', image: bellPepper },
  { id: '7', name: 'Bokchoy', quantity: '3 left', expiry: 'Expires in 5 days', image: bokchoy },
  { id: '8', name: 'Broccoli', quantity: '2 left', expiry: 'Expires in 7 days', image: broccoli },
  { id: '9', name: 'Cucumber', quantity: '3 left', expiry: 'Expires in 2 days', image: cucumber },
  { id: '10', name: 'Milk', quantity: '1 left', expiry: 'Expires in 2 days', image: milk },
  { id: '11', name: 'Tomato', quantity: '1 left', expiry: 'Expires in 2 days', image: tomato },
  { id: '12', name: 'Bell Pepper', quantity: '1 left', expiry: 'Expires in 2 days', image: bellPepper },
];


// Quick Recipes Data
const quickRecipeData = {
    id: '1',
    name: 'Avocado Egg Sandwich',
    uses: 'avocados, eggs, white bread, fresh thyme',
    consume: 'Consume within 2 days',
    image: avocadoEggSandwich,
};


// --- End Sample Data ---



export function Home() {
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
            // Handle button press logic here
            console.log('Recipe Card "View Recipe" button pressed');
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
      // marginBottom: 15, // Can add bottom margin here INSTEAD of the card if preferred
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