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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RecipeData } from '../../types/navigation';
import { getRecipeSwipeImage } from '../../utils/recipeSwipeImage'; // Import the utility function
import RecipeMacro from '../../components/RecipeMacro'; 
import RecipeIngredient from '../../components/RecipeIngredient'; // Import component

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  route: {
    params: {
      recipeData: RecipeData;
    };
  };
};

// --- RecipeDetailScreen Component ---
// This component expects `navigation` and `route` props from React Navigation
// `route.params.recipeData` should contain the data for the recipe to display
const RecipeViewScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { recipeData } = route.params;
  
  // Helper function to determine the correct image source
  const getImageSource = (image: any): ImageSourcePropType => {
    // If image is a string, use the utility function
    if (typeof image === 'string') {
      return getRecipeSwipeImage(image);
    }
    // Otherwise, return the image directly (it's already an ImageSourcePropType)
    return image;
  };

  const handleMakeNow = () => {
    console.log(`Making "${recipeData.name}" now!`);
    // Add logic here: e.g., deduct ingredients from inventory, navigate elsewhere
    navigation.navigate('RecipeAdjust', { recipeData });
  };

  const handleGoBack = () => {
    navigation.goBack();
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
        {/* Recipe Image - supporting both string refs and direct image sources */}
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
              <RecipeIngredient 
                ingredients={recipeData.ingredients}
                serves={recipeData.serves}
              />
            </View>
          </View>

          {/* Macronutrients Section */}
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>Macronutrients</Text>
            <View style={styles.cardContainer}>
              <RecipeMacro macronutrients={{
                ...recipeData.macronutrients,
                fat: recipeData.macronutrients.fats
              }} />
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
    alignItems: 'stretch',
  },
  section: {
    flex: 1, // Each section takes half the width
    marginHorizontal: 5, // Add margin between sections
    alignSelf: 'stretch',
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
    paddingVertical: 15,
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
  cardContainer: {
    flex: 1, // Take up all available height
    display: 'flex',
  },
});

export default RecipeViewScreen;