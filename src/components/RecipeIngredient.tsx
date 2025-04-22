import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type RecipeIngredientProps = {
  ingredients: string[];
  serves: number;
};

const RecipeIngredient = ({ ingredients, serves }: RecipeIngredientProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.servesText}>Serves {serves}</Text>
      
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.listItem}>
          • {ingredient}
        </Text>
      ))}
      <View style={styles.flexFiller} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  servesText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  listItem: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  flexFiller: {
    flex: 1,
  }
});

export default RecipeIngredient;
