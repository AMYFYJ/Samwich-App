import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../../../components/RecipeCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import salmonRiceBowl from '../../../assets/Recipe/salmon rice bowl.png';
import avocadoEggSandwich from '../../../assets/Recipe/avocado sandwich.png';
import pumpkinSoup from '../../../assets/Recipe/pumpkin soup.png';


// Sample recipe data - in a real app, this would come from a backend or context
const savedRecipes = [
    {
        id: 1,
        name: 'Avocado Egg Sandwich',
        serves: 1,
        uses: 'Avocados, Eggs, White bread, Fresh thyme',
        consume: 'Consume within 2 days',
        image: avocadoEggSandwich,
        ingredients: ['2 Avocados', '2 Eggs', '2 White bread', '1 Fresh thyme'],
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
    },
    {
        id: 2,
        name: 'Pumpkin Soup',
        image: pumpkinSoup,
        serves: 4,
        uses: 'Pumpkin, Chicken broth, Garlic, Onion, Salt, Pepper',
        consume: 'Consume within 5 days',
        ingredients: ['1 Pumpkin', '1 Cup Chicken broth', '1 Garlic clove', '1 Onion', '1 Salt', '1 Pepper'],
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
    },
    {
        id: 3,
        name: 'Salmon Rice Bowl',
        image: salmonRiceBowl,
        serves: 1,
        uses: 'Salmon, Rice, Soy sauce, Green onion',
        consume: 'Consume within 2 days',
        ingredients: ['1 slice of Salmon', '1 Cup Rice', '1 Tbsp Soy sauce', '1 Green onion'],
        macronutrients: {
            calories: '452 cal',
            protein: '9.5 g',
            carbohydrates: '43 g',
            fats: '29 g',
            fiber: '7 g',
        },
        instructions: [
            'Cook the salmon in the pan, each side for 2 minutes.',
            'Cook the rice in the microwave for 2 minutes.',
            'Mix the soy sauce and green onion together.',
            'Serve the salmon and rice on a bowl.',
        ],
    }
]
  

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CompletedRecipes = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleUseNow = (recipeId: number) => {
    // Find the recipe by ID
    const selectedRecipe = savedRecipes.find(recipe => recipe.id === recipeId);
    
    if (selectedRecipe) {
      // Navigate to recipe details screen with properly formatted data
      navigation.navigate('RecipeView', { 
        recipeData: {
          id: selectedRecipe.id,
          name: selectedRecipe.name,
          image: selectedRecipe.image,
          uses: selectedRecipe.uses,
          serves: selectedRecipe.serves,
          consume: selectedRecipe.consume,
          ingredients: selectedRecipe.ingredients,
          macronutrients: selectedRecipe.macronutrients,
          instructions: selectedRecipe.instructions,
        }
      });
    }
  };

  const handleBackButton = () => {
    // Simply go back to the previous screen with default animation
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Text style={styles.backButtonText}>◀</Text>
        </TouchableOpacity>
          <Text style={styles.title}>Completed Recipes</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            uses={recipe.uses}
            consume={recipe.consume}
            imageSource={recipe.image}
            macronutrients={recipe.macronutrients}
            instructions={recipe.instructions}
            onUseNow={() => handleUseNow(recipe.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 70,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 23,
    color: '#114641',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#114641',
    marginLeft: 25,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default CompletedRecipes;
