import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar, // Import StatusBar
  ImageSourcePropType
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

// Example Recipe Data Structure (This would usually come from route.params)
const avocadoToastData = {
  name: 'Avocado Tomato Toast',
  image: {  }, // Replace with your actual image URL or local require
  serves: 1,
  ingredients: [
    '2 slices White Bread',
    '1 medium Avocado',
    '1 medium Roma Tomato',
    '1 tsp Olive Oil',
    '1 tsp Fresh Thyme',
    'Salt & Pepper to taste',
  ],
  macronutrients: {
    calories: '452 cal',
    protein: '9.5 g',
    carbohydrates: '43 g',
    fats: '29 g',
    fiber: '7 g',
  },
  instructions: [
    'Lightly toast the 2 slices of white bread until golden and crisp.',
    'Prepare the avocado by cutting the avocado in half, removing the pit, and scooping the flesh into a bowl. Mash the avocado with a fork and season with salt and pepper.',
    'Cut the Roma tomato into thin slices.',
    'Assemble the toast. Spread the mashed avocado evenly over the toasted bread. Top with sliced tomatoes.',
    'Finish off your toast with a drizzle with olive oil and sprinkle fresh thyme on top. Add more salt and pepper if desired.',
  ],
};

// --- RecipeDetailScreen Component ---
// This component expects `navigation` and `route` props from React Navigation
// `route.params.recipeData` should contain the data for the recipe to display
const RecipeDetailScreen = ({ route, navigation }: Props) => {
  // Get recipe data from navigation parameters or use default example data
  const recipeData = route.params?.recipeData || avocadoToastData;

  const handleMakeNow = () => {
    console.log(`Making "${recipeData.name}" now!`);
    // Add logic here: e.g., deduct ingredients from inventory, navigate elsewhere
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Optional: Configure Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Recipe Image */}
        <Image source={recipeData.image} style={styles.recipeImage} resizeMode="cover" />

        {/* Recipe Title */}
        <Text style={styles.title}>{recipeData.name}</Text>

        <View style={styles.detailsContainer}>
          {/* Ingredients Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.servesText}>Serves {recipeData.serves}</Text>
            {recipeData.ingredients.map((item, index) => (
              <Text key={index} style={styles.listItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Macronutrients Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Macronutrients</Text>
            <Text style={styles.macroText}>Per serving:</Text>
            {Object.entries(recipeData.macronutrients).map(([key, value]) => (
              <Text key={key} style={styles.listItem}>
                • {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </Text>
            ))}
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipeData.instructions.map((step, index) => (
            <Text key={index} style={styles.instructionStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        {/* Spacer to push button down if content is short */}
         <View style={{ flexGrow: 1 }} />

      </ScrollView>

       {/* Make this now Button */}
       <TouchableOpacity style={styles.makeNowButton} onPress={handleMakeNow}>
          <Text style={styles.makeNowButtonText}>Make this now</Text>
        </TouchableOpacity>

       {/* Note: The Bottom Navigation (Home, Recipes, Inventory) is typically
            part of a Tab Navigator setup in your main App navigator file
            (e.g., App.js or navigation/AppNavigator.js) and not rendered
            inside individual screens like this one. */}
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // Match background
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50, // Adjust based on platform/status bar
    left: 15,
    zIndex: 10, // Ensure it's above the image
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  backButtonText: {
    color: '#ffffff', // White text for visibility on image
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: '100%',
    height: 250, // Adjust height as needed
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    flexDirection: 'row', // Arrange Ingredients and Macros side-by-side
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    flex: 1, // Each section takes half the width
    marginHorizontal: 5, // Add some space between sections
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
   servesText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  macroText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
 },
  listItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
    lineHeight: 20,
  },
  instructionsSection: {
    paddingHorizontal: 25, // More padding for instructions
    marginBottom: 20, // Space before the button
  },
  instructionStep: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22, // Improve readability
  },
  makeNowButton: {
    backgroundColor: '#2E8B57', // SeaGreen color from image
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20, // Side margins
    borderRadius: 8, // Rounded corners
    marginBottom: 15, // Space from bottom or nav bar
    marginTop: 10, // Space from content above
  },
  makeNowButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen;