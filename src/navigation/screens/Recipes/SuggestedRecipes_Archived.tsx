import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeSwipe from '../../../components/RecipeSwipe';
import { useNavigation } from '@react-navigation/native';
import { RecipeData } from '../../../types/navigation';

const SuggestedRecipes: React.FC = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  
  useEffect(() => {
    // Load recipes from JSON file
    const recipesData = require('../../../../sample_data/recipes.json');
    setRecipes(recipesData.recipeData);
    setTotalRecipes(recipesData.recipeData.length);
  }, []);

  // Calculate progress (0-1) for the progress bar
  const progress = totalRecipes > 0 ? (totalRecipes - recipes.length) / totalRecipes : 0;

  const handleSwipeLeft = () => {
    // Skip this recipe
    if (recipes.length > 0) {
      setRecipes(prevRecipes => {
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped left: dismissed');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
    }
  };

  const handleSwipeRight = () => {
    // View recipe details
    if (recipes.length > 0) {
      navigation.navigate('RecipeView', { recipeData: recipes[0] });
      setRecipes(prevRecipes => {
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped right: view');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
    }
  };

  const handleSwipeDown = () => {
    // Save recipe
    if (recipes.length > 0) {
      // Logic to save recipe
      console.log(`Saved recipe: ${recipes[0].name}`);
      setRecipes(prevRecipes => {
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped down: saved');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInfoPress = () => {
    // Show info about suggested recipes
    console.log('Info button pressed');
  };

  const handleRefresh = () => {
    // Reload recipes from the JSON file
    const recipesData = require('../../../../sample_data/recipes.json');
    setRecipes(recipesData.recipeData);
    setTotalRecipes(recipesData.recipeData.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#1A3B34" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suggested Recipes</Text>
        <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
          <Ionicons name="information-circle" size={28} color="#1A3B34" />
        </TouchableOpacity>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>
      
      <View style={styles.cardContainer}>
        {recipes.slice(0, 3).map((recipeData, index) => (
          <RecipeSwipe
            key={recipeData.id}
            recipe={recipeData}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeDown={handleSwipeDown}
            isTopCard={index === 0}
            style={{
              zIndex: recipes.length - index,
              top: index * 10,
            }}
          />
        ))}
        
        {recipes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No more recipes available</Text>
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={handleRefresh}
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSwipeLeft}>
          <Ionicons name="close-circle" size={48} color="#F24C5F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleSwipeDown}>
          <Ionicons name="download" size={48} color="#FB9702" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleSwipeRight}>
          <Ionicons name="eye" size={48} color="#20A77B" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0', // Light cream background matching your screenshot
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3B34', // Dark green color matching your screenshot
  },
  infoButton: {
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  cardsWrapper: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#4A4A4A',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#1A3B34',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    marginBottom: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    backgroundColor: '#F8F8F8',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  progressBarContainer: {
    marginHorizontal: 50,
    marginBottom: 25,
  },
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
});

export default SuggestedRecipes;
