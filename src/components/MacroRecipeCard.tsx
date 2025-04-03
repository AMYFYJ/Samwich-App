// src/components/MacrosCard.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// --- Prop Types ---
type MacroItem = {
    id: string;
    name: string;
    grams: number;
    percentage: number;
};

interface MacroRecipeCardProps {
  totalCalories: number;
  macrosData: MacroItem[];
}

// --- Component ---
export const MacroRecipeCard: React.FC<MacroRecipeCardProps> = ({
  totalCalories,
  macrosData,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Macronutrients</Text>
      <View style={styles.chartArea}>
        <View style={styles.donutContainer}>
          {/* Simulated donut arcs */}
          <View style={[styles.halfCircle, styles.carbsArc]} />
          <View style={[styles.halfCircle, styles.proteinArc]} />
          <View style={[styles.halfCircle, styles.fatArc]} />
          <View style={[styles.halfCircle, styles.fiberArc]} />

          {/* Center circle for donut hole */}
          <View style={styles.innerCircle}>
            <Text style={styles.centerText}>{totalCalories}</Text>
            <Text style={styles.totalText}>calories</Text>
          </View>
        </View>

        {/* Labels */}
        <Text>% of Daily Goals</Text>
        <View style={styles.labelView}>
            <Text style={styles.label}>Carbohydrates</Text>
            <Text style={styles.label}>{macrosData[0].grams}g</Text>
            <Text style={styles.label}>{macrosData[0].percentage}%</Text>
        </View>
        <View style={styles.labelView}>
            <Text style={styles.label}>Protein</Text>
            <Text style={styles.label}>{macrosData[0].grams}g</Text>
            <Text style={styles.label}>{macrosData[0].percentage}%</Text>
        </View>
        <View style={styles.labelView}>
            <Text style={styles.label}>Fiber</Text>
            <Text style={styles.label}>{macrosData[0].grams}g</Text>
            <Text style={styles.label}>{macrosData[0].percentage}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Card container styling
  cardContainer: {
    marginBottom: 25,
    backgroundColor: '#355E3B', // Dark green background
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Chart area styling
  chartArea: {
    alignItems: 'center',
    position: 'relative',
    width: 220,
    height: 220,
    marginBottom: 10,
  },
  donutContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Base style for each arc (halfCircle)
  halfCircle: {
    width: 200, 
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    borderWidth: 28, // arc width
    borderColor: 'transparent',
  },
  // Each arc style – adjust these rotations and colors as needed:
  carbsArc: {
    borderRightColor: '#FAD759', // Orange for Carbs
    transform: [{ rotate: '0deg' }],
  },
  proteinArc: {
    borderRightColor: '#F9A825', // Yellow for Protein
    transform: [{ rotate: '90deg' }],
  },
  fatArc: {
    borderRightColor: '#A1887F', // Brownish for Fat
    transform: [{ rotate: '180deg' }],
  },
  fiberArc: {
    borderRightColor: '#E57373', // Red for Fiber
    transform: [{ rotate: '270deg' }],
  },

  // Inner circle styling for the donut hole
  innerCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#355E3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalText: {
    fontSize: 13,
    color: '#FFFFFF',
  },

  // Labels around the donut
  label: {
    color: '#FFFFFF',
    fontSize: 12,
    position: 'absolute',
  },
  labelView: {
    color: '#FFFFFF',
    fontSize: 12,
    position: 'absolute',
  },
});

export default MacroRecipeCard;