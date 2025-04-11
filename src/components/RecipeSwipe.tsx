import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecipeData } from '../types/navigation';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

interface RecipeCardProps {
  recipe: RecipeData;
  onSwipeLeft: () => void;  // Skip recipe
  onSwipeRight: () => void; // View recipe details
  onSwipeDown: () => void;  // Save recipe
  isTopCard?: boolean;
}

const RecipeSwipe: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeDown,
  isTopCard = true
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(isTopCard ? 1 : 0.95);
  const opacity = useSharedValue(isTopCard ? 1 : 0.5);

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

  const onGestureEvent = ({ nativeEvent }: any) => {
    'worklet';
    const { translationX, translationY } = nativeEvent;
    translateX.value = translationX;
    translateY.value = translationY;
  };

  const onGestureEnd = ({ nativeEvent }: any) => {
    'worklet';
    const { translationX, translationY } = nativeEvent;
    
    if (translationX > SWIPE_THRESHOLD) {
      // Swipe right - view recipe
      translateX.value = withSpring(width * 1.5);
      runOnJS(onSwipeRight)();
    } else if (translationX < -SWIPE_THRESHOLD) {
      // Swipe left - skip recipe
      translateX.value = withSpring(-width * 1.5);
      runOnJS(onSwipeLeft)();
    } else if (translationY > SWIPE_THRESHOLD) {
      // Swipe down - save recipe
      translateY.value = withSpring(width);
      runOnJS(onSwipeDown)();
    } else {
      // Reset position if swipe doesn't meet threshold
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onEnded={onGestureEnd}
          enabled={isTopCard}
        >
          <Animated.View style={[styles.card, handleGestureEvent]}>
            <Image source={recipe.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{recipe.name}</Text>
              <Text style={styles.nutritionInfo}>
                Calories: {recipe.macronutrients.calories}, Protein: {recipe.macronutrients.protein}, Fats: {recipe.macronutrients.fats}
              </Text>
              <Text style={styles.consumeInfo}>Consume within {recipe.consume}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  card: {
    width: width * 0.9,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: width * 0.9, // Square image
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A3B34', // Dark green to match the header in your screenshot
  },
  nutritionInfo: {
    fontSize: 16,
    marginBottom: 4,
    color: '#4A4A4A',
  },
  consumeInfo: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4A4A4A',
  },
});

export default RecipeSwipe;