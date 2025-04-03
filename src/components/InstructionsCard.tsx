// src/components/RecipeCard.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface InstructionsCardProps {
    instructions: string[],
}

export const InstructionsCard: React.FC<InstructionsCardProps> = ({
    instructions,
}) => {
  return (
    <View style={styles.instructionsCardContainer}>
      <View style={styles.instructionsDetails}>
        <Text style={styles.header}>Ingredients</Text>
        <ol>
        {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
        ))}
        </ol>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instructionsCardContainer: {
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
  instructionsDetails: {
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

export default InstructionsCard;
