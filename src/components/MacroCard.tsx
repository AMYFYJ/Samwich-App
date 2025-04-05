// src/components/MacrosCard.tsx
import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';

// --- Prop Types ---
interface MacrosCardProps {
  totalCalories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  style?: ViewStyle; // not required
  titleStyle?: TextStyle; // not required
}

// --- Component ---
export const MacrosCard: React.FC<MacrosCardProps> = ({
  totalCalories,
  carbs,
  protein,
  fat,
  fiber,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
      <Text style={[styles.title, titleStyle]}>Today's Macros</Text>
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
            <Text style={styles.totalText}>Total Calories</Text>
          </View>
        </View>

        {/* Labels */}
        <Text style={[styles.label, styles.labelCarbs]}>
          Carbohydrates: {carbs}g
        </Text>
        <Text style={[styles.label, styles.labelProtein]}>
          Protein: {protein}g
        </Text>
        <Text style={[styles.label, styles.labelFat]}>
          Fat: {fat}g
        </Text>
        <Text style={[styles.label, styles.labelFiber]}>
          Fiber: {fiber}g
        </Text>
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
  labelCarbs: {
    top: 0,
    right: -65,
  },
  labelProtein: {
    bottom: 60,
    right: -60,
  },
  labelFat: {
    bottom: 0,
    left: 50,
  },
  labelFiber: {
    top: '40%',
    left: -55,
  },
});

export default MacrosCard;