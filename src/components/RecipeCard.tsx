// src/components/RecipeCard.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface RecipeCardProps {
  id: number;
  name: string;
  uses: string;
  consume: string;
  imageSource: ImageSourcePropType;
  macronutrients: {
    calories: string;
    protein: string;
    carbohydrates: string;
    fats: string;
    fiber: string;
  };
  instructions: string[];
  onUseNow: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  uses,
  consume,
  imageSource,
  onUseNow,
}) => {
  return (
    <View style={styles.recipeCardContainer}>
      <Image source={imageSource} style={styles.recipeImage} />
      <View style={styles.recipeDetails}>
        <Text style={styles.recipeTitle}>{name}</Text>
        <Text style={styles.recipeUses}>Uses: {uses}</Text>
        <View style={styles.recipeFooter}>
          <Text style={styles.recipeConsume}>{consume}</Text>
          <TouchableOpacity style={styles.useNowButton} onPress={onUseNow}>
            <Text style={styles.useNowButtonText}>View ▸</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeCardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    paddingVertical: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 3,
  },
  recipeImage: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    left: 8,
  },
  recipeDetails: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeUses: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeConsume: {
    fontSize: 12,
    color: '#FB9702',
  },
  useNowButton: {
    backgroundColor: '#20A77B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  useNowButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default RecipeCard;
