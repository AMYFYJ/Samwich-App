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
import IngredientsCard from '../../components/IngredientsCard';
import MacroRecipeCard from '../../components/MacroRecipeCard';
import InstructionsCard from '../../components/InstructionsCard';
// images
import toastImage from '../../assets/Recipe/avocado and tomato.png';


// --- Sample Data --

// Expiring Items Data

type MacroItem = {
    id: string;
    name: string;
    grams: number;
    percentage: number;
  };

// Sample Macro Data
const macrosData: MacroItem[] = [
    { id: '1', name: 'Carbohydrates', grams: 43, percentage: 90, },
    { id: '2', name: 'Protein', grams: 9.5, percentage: 56, },
    { id: '3', name: 'Fiber', grams: 7, percentage: 60, },
  ];
  
// Quick Recipes Data
const servesNumber = 1;
const totalCalories = 452;

const ingredients: string[] = [
  "2 slices White Bread",
  "1 medium Avocado",
  "1 medium Roma Tomato",
  "1 tsp Olive Oil",
  "1 tsp Fresh Thyme",
  "Salt & Pepper to taste"
];

const instructions: string[] = [
    "Lightly toast the 2 slices of white bread until golden and crisp.",
    "Prepare the avocado by cutting the avocado in half, removing the pit, and scooping the flesh into a bowl. Mash the avocado with a fork and season with salt and pepper.",
    "Cut the Roma tomato into thin slices.",
    "Assemble the toast. Spread the mashed avocado evenly over the toasted bread. Top with sliced tomatoes.",
    "Finish off your toast with a drizzle with olive oil and sprinkle fresh thyme on top. Add more salt and pepper if desired.",
  ];

// --- End Sample Data ---



export function Home() {
  // --- Render Function for Grid Item ---
//   const renderExpiringItem = ({ item }: { item: ExpiringItem }) => (
//     <FoodItemCard
//         name={item.name}
//         quantity={item.quantity}
//         expiry={item.expiry}
//         image={item.image}
//     />
// );
  // --- End Render Function ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <img src='../../assets/Recipe/avocado and tomato.png' alt="Image" style={styles.recipeImage}/>;
        {/* === Today's Macros Section === */}
        <IngredientsCard
            servesNumber={servesNumber}
            ingredientList={ingredients}
        />
        <MacroRecipeCard
            totalCalories={totalCalories}
            macrosData={macrosData}
        />

        <InstructionsCard
            instructions={instructions}
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
  recipeImage: {
    
  },
  
});