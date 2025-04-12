import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeSwipe from '../../../components/RecipeSwipe';
import { useNavigation } from '@react-navigation/native';
import { RecipeData } from '../../../types/navigation';

const SuggestedRecipes2: React.FC = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [previousRecipes, setPreviousRecipes] = useState<RecipeData[]>([]);
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

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
        // Add current recipe to previousRecipes stack
        setPreviousRecipes(prev => [prevRecipes[0], ...prev]);
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped left: dismissed');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
      // Advance tutorial if relevant
      if (isTutorialVisible && tutorialStep === 1) {
        advanceTutorialStep();
      }
    }
  };

  const handleSwipeRight = () => {
    // View recipe details
    if (recipes.length > 0) {
      navigation.navigate('RecipeView', { recipeData: recipes[0] });
      setRecipes(prevRecipes => {
        // Add current recipe to previousRecipes stack
        setPreviousRecipes(prev => [prevRecipes[0], ...prev]);
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped right: view');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
      // Advance tutorial if relevant
      if (isTutorialVisible && tutorialStep === 4) {
        advanceTutorialStep();
      }
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
      // Advance tutorial if relevant
      if (isTutorialVisible && tutorialStep === 3) {
        advanceTutorialStep();
      }
    }
  };

  const handleRevertSwipe = () => {
    // Bring back the previously swiped recipe
    if (previousRecipes.length > 0) {
      const lastRecipe = previousRecipes[0];
      setPreviousRecipes(prev => prev.slice(1));
      setRecipes(prev => [lastRecipe, ...prev]);
      console.log(`Reverted: ${lastRecipe.name} is back on top`);
    } else {
      console.log('No recipes to revert');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInfoPress = () => {
    // Show tutorial when info button is pressed
    setIsTutorialVisible(true);
    setTutorialStep(0);
  };

  const handleCloseTutorial = () => {
    setIsTutorialVisible(false);
    setTutorialStep(0);
  };

  const advanceTutorialStep = () => {
    if (tutorialStep < 4) {
      setTutorialStep(prevStep => prevStep + 1);
      console.log('going to step:', tutorialStep);
    } else {
      handleCloseTutorial(); // Close tutorial after the last step
    }
  };

  // Helper function to render the appropriate tutorial content for each step
  const renderTutorialContent = () => {
    // Define position and size for the highlight area
    const getHighlightPosition = (step: number): ViewStyle => {
      const highlightSize = 80;
      const highlightRadius = highlightSize / 2;
      const bottomPosition = 60;
      
      const baseStyle = {
        width: highlightSize,
        height: highlightSize,
        borderRadius: highlightRadius,
        bottom: bottomPosition,
      };

      // Step 0 is intro step - no highlight position needed
      if (step === 0) {
        return {}; // Empty position for intro step
      }

      switch (step) {
        case 1: // Dismiss Button (X)
          return {
            ...baseStyle,
            left: '31%',
            marginLeft: -highlightRadius,
          };
        case 2: // Undo Button
          return {
            ...baseStyle,
            left: '8%',
            marginLeft: -highlightRadius,
          };
        case 3: // Save Button (download)
          return {
            ...baseStyle,
            left: '56%',
            marginLeft: -highlightRadius,
          };
        case 4: // View Button (eye)
          return {
            ...baseStyle,
            right: '6%',
            marginRight: -highlightRadius,
          };
        default: 
          return {};
      }
    };
    
    const highlightPosStyle = getHighlightPosition(tutorialStep);

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* Dimmer View */}
        <View style={styles.tutorialDimmer} pointerEvents="auto" />

        {/* For steps 1-4, show highlight area around buttons */}
        {tutorialStep > 0 && (
          <View
            style={[styles.highlightTouchableArea, { position: 'absolute', ...highlightPosStyle }]}
            pointerEvents="box-none" // Allow touches to pass through if needed
          />
        )}

        {/* For intro step (step 0), show centered intro content */}
        {tutorialStep === 0 && (
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>Walkthrough Guide for{'\n'}Exploring Suggested Recipes</Text>
            <Text style={styles.introSubtitle}>Tap anywhere to continue</Text>
            <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={{ marginTop: 10 }} />
          </View>
        )}
      </View>
    );
  };

  // Separate function to render the overlay button for the intro step
  const renderTutorialOverlayButton = () => {
    if (tutorialStep !== 0) return null;
    
    return (
      <TouchableOpacity 
        style={[StyleSheet.absoluteFill, { zIndex: 2000 }]}
        onPress={advanceTutorialStep}
        activeOpacity={0.7}
      />
    );
  };

  const handleRefresh = () => {
    // Reload recipes from the JSON file
    const recipesData = require('../../../../sample_data/recipes.json');
    setRecipes(recipesData.recipeData);
    setTotalRecipes(recipesData.recipeData.length);
    setPreviousRecipes([]);
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
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            !previousRecipes.length && styles.actionButtonDisabled,
            isTutorialVisible && tutorialStep === 2 && { position: 'relative', zIndex: 1002 }
          ]} 
          onPress={() => {
            handleRevertSwipe();
            if (isTutorialVisible && tutorialStep === 2) advanceTutorialStep();
          }}
          disabled={!previousRecipes.length}
        >
          <Ionicons name="arrow-undo" size={42} color="#FAD759" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            isTutorialVisible && tutorialStep === 1 && { position: 'relative', zIndex: 1002 }
          ]} 
          onPress={() => {
            handleSwipeLeft();
            if (isTutorialVisible && tutorialStep === 1) advanceTutorialStep();
          }}
        >
          <Ionicons name="close-circle" size={48} color="#F24C5F" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            isTutorialVisible && tutorialStep === 3 && { position: 'relative', zIndex: 1002 }
          ]} 
          onPress={() => {
            handleSwipeDown();
            if (isTutorialVisible && tutorialStep === 3) advanceTutorialStep();
          }}
        >
          <Ionicons name="download" size={48} color="#FB9702" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            isTutorialVisible && tutorialStep === 4 && { position: 'relative', zIndex: 1002 }
          ]} 
          onPress={() => {
            handleSwipeRight();
            if (isTutorialVisible && tutorialStep === 4) advanceTutorialStep();
          }}
        >
          <Ionicons name="eye" size={48} color="#20A77B" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      {/* Tutorial overlay */}
      {isTutorialVisible && (
        <>
          {renderTutorialContent()}
          {renderTutorialOverlayButton()}
          <TouchableOpacity 
            style={styles.closeTutorialButton}
            onPress={handleCloseTutorial}
          >
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      )}
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
  actionButtonDisabled: {
    backgroundColor: '#F0F0F0',
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

  // Tutorial styles
  tutorialDimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeTutorialButton: {
    position: 'absolute',
    top: 65,
    right: 20,
    zIndex: 1001,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightTouchableArea: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 1003,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 36,
  },
  introSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default SuggestedRecipes2;
