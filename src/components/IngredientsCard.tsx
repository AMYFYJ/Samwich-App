// src/components/RecipeCard.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface IngredientsCardProps {
    servesNumber: number,
    ingredientList: string[],
}

export const IngredientsCard: React.FC<IngredientsCardProps> = ({
    servesNumber,
    ingredientList,
}) => {
  return (
    <View style={styles.ingredientsCardContainer}>
      <View style={styles.ingredientsDetails}>
        <Text style={styles.header}>Ingredients</Text>
        <Text style={styles.servesText}>Serves: {servesNumber}</Text>
        <ul>
        {ingredientList.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ))}
        </ul>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientsCardContainer: {
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
  ingredientsDetails: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  servesText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
});

export default IngredientsCard;
