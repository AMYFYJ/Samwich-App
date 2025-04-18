import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecipeData } from '../types/navigation';
import { getRecipeSwipeImage } from '../utils/recipeSwipeImage';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

interface RecipeCardProps {
  recipe: RecipeData;
  onSwipeLeft: () => void;  // Skip recipe
  onSwipeRight: () => void; // Save recipe
  onSwipeUp?: () => void;   // View recipe details 
  onPress?: () => void;     // View recipe details
  isTopCard?: boolean;
  style?: object;
}

const RecipeSwipe: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onSwipeLeft, 
  onSwipeRight,
  onSwipeUp,
  onPress,
  isTopCard = true,
  style = {}
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(isTopCard ? 1 : 0.95);
  const opacity = useSharedValue(isTopCard ? 1 : 0.2);

  // Update scale and opacity when isTopCard changes
  useEffect(() => {
    scale.value = withSpring(isTopCard ? 1 : 0.95);
    opacity.value = withSpring(isTopCard ? 1 : 0.2);
  }, [isTopCard, scale, opacity]);

  // Transforms position values into visual styles (rotation, etc.)
  const handleGestureEvent = useAnimatedStyle(() => {
    rotation.value = (translateX.value / width) * 15; // Rotate based on swipe distance
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  // Tracks finger movement and updates position values in real-time
  const onGestureEvent = ({ nativeEvent }: any) => {
    'worklet';
    const { translationX, translationY } = nativeEvent;
    translateX.value = translationX;
    translateY.value = translationY;
  };

  // Determines what should happen when the gesture completes
  const onGestureEnd = ({ nativeEvent }: any) => {
    'worklet';
    const { translationX, translationY } = nativeEvent;
    
    if (translationX > SWIPE_THRESHOLD) {
      // Swipe right - save recipe
      translateX.value = withSpring(width * 1.5);
      runOnJS(onSwipeRight)();
    } else if (translationX < -SWIPE_THRESHOLD) {
      // Swipe left - skip recipe
      translateX.value = withSpring(-width * 1.5);
      runOnJS(onSwipeLeft)();
    } else if (translationY < -SWIPE_THRESHOLD && onSwipeUp) {
      // Swipe up - view recipe
      translateY.value = withSpring(-width);
      runOnJS(onSwipeUp)();
    } else {
      // Reset position if swipe doesn't meet threshold
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  };

  return (
    <GestureHandlerRootView style={[styles.rootContainer, style]}>
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onEnded={onGestureEnd}
          enabled={isTopCard}
        >
          <Animated.View style={[styles.card, handleGestureEvent]}>
            <TouchableWithoutFeedback onPress={isTopCard && onPress ? onPress : undefined}>
              <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={getRecipeSwipeImage(recipe.image)} 
                    style={styles.image} 
                  />
                  <View style={styles.overlay} />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{recipe.name}</Text>
                  <Text style={styles.usesInfo}>Uses: {recipe.uses}</Text>
                  <Text style={styles.nutritionInfo}>
                    {recipe.macronutrients.calories}, {recipe.macronutrients.protein} protein, {recipe.macronutrients.fats} fats, {recipe.macronutrients.carbohydrates} carbs
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    width: '100%',
    height: width * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardContent: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: width * 1.2,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  infoContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
  nutritionInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    fontStyle: 'italic',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
  usesInfo: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default RecipeSwipe;