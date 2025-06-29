import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeSwipe from '../../../components/RecipeSwipe';
import { useNavigation } from '@react-navigation/native';
import { RecipeData } from '../../../types/navigation';

const SuggestedRecipes: React.FC = () => {
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
    // Save recipe (changed from view recipe details)
    if (recipes.length > 0) {
      // Logic to save recipe
      console.log(`Saved recipe: ${recipes[0].name}`);
      setRecipes(prevRecipes => {
        // Add current recipe to previousRecipes stack
        setPreviousRecipes(prev => [prevRecipes[0], ...prev]);
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped right: saved');
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
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* Dimmer View */}
        <View style={styles.tutorialDimmer} pointerEvents="auto" />

        {/* For intro step (step 0), show centered intro content */}
        {tutorialStep === 0 && (
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>Walkthrough Guide for{'\n'}Exploring Suggested Recipes</Text>
            <Text style={styles.introSubtitle}>Tap anywhere to continue</Text>
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

  // Helper function to render tooltip cards for each tutorial step
  const renderTutorialTooltip = () => {
    // Don't show tooltips for intro step
    if (tutorialStep === 0) return null;
    
    // Define tooltip content and position for each step
    const getTooltipConfig = () => {
      switch (tutorialStep) {
        case 1: // Dismiss Button (X)
          return {
            text: "Swipe left or press 'X' to skip a recipe",
            position: { bottom: 80, left: '57%', marginLeft: -40, width: 170} as ViewStyle,
          };
        case 2: // Undo Button
          return {
            text: "Press 'Undo' to bring back the previous recipe",
            position: { top: 100, left: '30%', width: 210 } as ViewStyle,
          };
        case 3: // Save Button (download)
          return {
            text: "Swipe right or press 'Save' to save a recipe",
            position: { bottom: 82, left: '5%', width: 190 } as ViewStyle,
          };
        case 4: // card press
          return {
            text: "Swipe up or tap the card to see recipe details",
            position: { top: '23%', left: '24%', width: 208 } as ViewStyle,
          };
        default:
          return null;
      }
    };
    
    const tooltipConfig = getTooltipConfig();
    if (!tooltipConfig) return null;
    
    return (
      <View style={[styles.tooltipCard, tooltipConfig.position]}>
        <View style={styles.tooltipTextContainer}>
          <Text style={styles.tooltipText}>{tooltipConfig.text}</Text>
        </View>
      </View>
    );
  };

  const handleSwipeUp = () => {
    // View recipe details
    if (recipes.length > 0) {
      navigation.navigate('RecipeView', { recipeData: recipes[0] });
      setRecipes(prevRecipes => {
        // Add current recipe to previousRecipes stack
        setPreviousRecipes(prev => [prevRecipes[0], ...prev]);
        const newRecipes = prevRecipes.slice(1);
        console.log('swiped up: view');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
      // Advance tutorial if relevant
      if (isTutorialVisible && tutorialStep === 4) {
        advanceTutorialStep();
      }
    }
  };

  const handleCardPress = () => {
    // Same behavior as swipe up
    if (recipes.length > 0) {
      navigation.navigate('RecipeView', { recipeData: recipes[0] });
      setRecipes(prevRecipes => {
        // Add current recipe to previousRecipes stack
        setPreviousRecipes(prev => [prevRecipes[0], ...prev]);
        const newRecipes = prevRecipes.slice(1);
        console.log('card pressed: view');
        console.log("New first recipe:", newRecipes.length > 0 ? newRecipes[0].name : "No more recipes");
        return newRecipes;
      });
      // Advance tutorial if relevant
      if (isTutorialVisible && tutorialStep === 4) {
        advanceTutorialStep();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#1A3B34" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suggested Recipes</Text>
        
        {/* Undo Button] */}
        <TouchableOpacity 
          style={[
            styles.undoButton,
            !previousRecipes.length && styles.undoButtonDisabled,
            isTutorialVisible && tutorialStep === 2 && { 
              position: 'relative', 
              zIndex: 1002,
              backgroundColor: '#FFF9F0',
              borderRadius: 30,
              shadowColor: '#FFFFFF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 4,
            }
          ]}
          onPress={() => {
            handleRevertSwipe();
            if (isTutorialVisible && tutorialStep === 2) advanceTutorialStep();
          }}
          disabled={!previousRecipes.length}
        >
          <Ionicons name="refresh-circle" size={37} color={previousRecipes.length ? "#1A3B34" : "#CCCCCC"} />
        </TouchableOpacity>
        
      </View>
      
      <View style={styles.cardContainer}>
        {recipes.slice(0, 3).map((recipeData, index) => (
          <RecipeSwipe
            key={recipeData.id}
            recipe={recipeData}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeUp={handleSwipeUp}
            onPress={handleCardPress}
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
      
        {/* Dismiss Button */}
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

        {/* Save Button */}
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            isTutorialVisible && tutorialStep === 3 && { position: 'relative', zIndex: 1002 }
          ]} 
          onPress={() => {
            handleSwipeRight();
            if (isTutorialVisible && tutorialStep === 3) advanceTutorialStep();
          }}
        >
          <Ionicons name="download" size={48} color="#FB9702" />
        </TouchableOpacity>
      </View>

  
      {/* Tutorial Info Button - Updated to be a box instead of just an icon */}
      <TouchableOpacity onPress={handleInfoPress} style={styles.infoButtonBox}>
        <Ionicons name="information-circle" size={24} color="#FFFFFF" />
        <Text style={styles.infoButtonText}>  View Tutorial</Text>
      </TouchableOpacity>

      {/* Tutorial overlay */}
      {isTutorialVisible && (
        <>
          {renderTutorialContent()}
          {renderTutorialOverlayButton()}
          {renderTutorialTooltip()}
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
    marginBottom: 62,
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
    left: 20,
    zIndex: 1001,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 36,
  },
  introSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  tooltipCard: {
    position: 'absolute',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: 250,
    zIndex: 1003,
  },
  tooltipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tooltipTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tooltipText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  undoButton: {
    padding: 4,
    marginRight: 5,
  },
  undoButtonDisabled: {
    opacity: 0.5,
  },
  infoButtonBox: {
    position: 'absolute',
    backgroundColor: '#20A77B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 35, 
    flexDirection: 'row',
    bottom: 15,
    alignSelf: 'center', //center horizontally
    marginHorizontal: 'auto', // Additional centering for some layouts
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default SuggestedRecipes;
