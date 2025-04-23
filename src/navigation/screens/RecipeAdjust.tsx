import React, { useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RecipeData } from '../../types/navigation';
import IngredientSelectionCard from '../../components/RecipeIngreSelection';
import { getRecipeSwipeImage } from '../../utils/recipeSwipeImage';
import RecipeMacro from '../../components/RecipeMacro';
import RecipeIngredient from '../../components/RecipeIngredient';
import foodData from '../../../sample_data/foods.json';
import { useFoodInventory } from '../../context/FoodContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


// --- RecipeDetailScreen Component ---
// This component expects `navigation` and `route` props from React Navigation
// `route.params.recipeData` should contain the data for the recipe to display
const RecipeAdjustScreen = ({ route }: { route: { params: { recipeData: RecipeData } } }) => {
  const navigation = useNavigation<NavigationProp>();
  const { recipeData } = route.params;

  // Get context values
  const { foodInventory, updateFoodInventory, saveChanges } = useFoodInventory();

  // Process ingredients similar to RecipeIngreSelection component
  const cleanIngredientName = (name: string) => {
    return name.replace(/^\d+\s*/, '').trim();
  };

  const extractQuantityFromIngredient = (ingredient: string): string => {
    const match = ingredient.match(/^(\d+(\.\d+)?)\s*/);
    return match ? match[1] : '1';
  };

  // Create a processed ingredients list
  const ingredientsList = recipeData.ingredients.map(ing => ({
    name: cleanIngredientName(ing),
    quantity: extractQuantityFromIngredient(ing),
  }));

  // Add state to track if ingredients were edited via popup
  const [ingredientsEditedViaPopup, setIngredientsEditedViaPopup] = useState(false);
  
  // Function to be called when ingredients change via popup
  const handleIngredientChange = () => {
    setIngredientsEditedViaPopup(true);
    console.log('Ingredients Edited Via Popup: ', ingredientsEditedViaPopup);
  };

  const handleFinishRecipe = () => {
    // Only deduct quantities if they weren't already deducted via popup
    if (!ingredientsEditedViaPopup && foodInventory.length > 0) {
      const updatedInventory = [...foodInventory];
      
      ingredientsList.forEach(ingredient => {
        // Find matching item in inventory
        const inventoryItem = updatedInventory.find(
          item => item.name.toLowerCase() === ingredient.name.toLowerCase()
        );
        
        if (inventoryItem) {
          // Parse quantities
          const currentQuantity = parseInt(inventoryItem.quantity.split(' ')[0]);
          const selectedQuantity = parseFloat(ingredient.quantity);
          
          // Calculate new quantity
          const newQuantity = Math.max(0, currentQuantity - selectedQuantity);
          
          // Update inventory item
          inventoryItem.quantity = `${newQuantity} left`;
        }
      });
      
      // Update the inventory in context
      updateFoodInventory(updatedInventory);
      
      // Save changes to storage
      saveChanges();
    }
    
    // Continue with navigation
    console.log(`Finish making "${recipeData.name}" `);
    navigation.navigate('HomeTabs', { 
      screen: 'Congrats', 
      params: { recipeData } 
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Helper function to determine the correct image source
  const getImageSource = (image: any): ImageSourcePropType => {
    // If image is a string, use the utility function
    if (typeof image === 'string') {
      return getRecipeSwipeImage(image);
    }
    // Otherwise, return the image directly (it's already an ImageSourcePropType)
    return image;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleGoBack}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Recipe Image */}
        <Image 
          source={getImageSource(recipeData.image)} 
          style={styles.recipeImage} 
          resizeMode="cover" 
        />

        {/* Recipe Title */}
        <Text style={styles.title}>{recipeData.name}</Text>

        <View style={styles.detailsContainer}>
          {/* Ingredients Section */}
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.cardContainer}>
              <IngredientSelectionCard 
                ingredients={recipeData.ingredients}
                serves={recipeData.serves}
                foodInventory={foodInventory}
                updateFoodInventory={updateFoodInventory}
                onIngredientsChange={handleIngredientChange}
              />
            </View>
          </View>

          {/* Macronutrients Section */}
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>Macronutrients</Text>
            <View style={styles.cardContainer}>
              <RecipeMacro macronutrients={recipeData.macronutrients} />
            </View>
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipeData.instructions.map((step: string, index: number) => (
            <Text key={index} style={styles.instructionStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        {/* Spacer to push button down if content is short */}
         <View style={{ flexGrow: 1 }} />

      </ScrollView>

       {/* Finish Recipe Button */}
       <TouchableOpacity style={styles.finishRecipeButton} onPress={handleFinishRecipe}>
          <Text style={styles.finishRecipeText}> ✓ Finish recipe </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F0', // Match background
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  backButton: {
    padding: 10,
    marginTop: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A7C59',
    fontWeight: '600',
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
  finishRecipeButton: {
    backgroundColor: '#2E8B57', // SeaGreen color from image
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20, // Side margins
    borderRadius: 8, // Rounded corners
    marginBottom: 15, // Space from bottom or nav bar
    marginTop: 10, // Space from content above
  },
  finishRecipeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1, // Take up all available height
    display: 'flex',
  },
});

export default RecipeAdjustScreen;