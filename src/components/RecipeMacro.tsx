import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MacronutrientsProps = {
  macronutrients: {
    calories?: string;
    carbohydrates?: string;
    protein?: string;
    fiber?: string;
    [key: string]: string | undefined; // handle any other macronutrients
  };
};

const RecipeMacro = ({ macronutrients }: MacronutrientsProps) => {
  // Extract values and convert to numbers where needed
  const calories = macronutrients.calories?.replace(/\D/g, '') || '0';
  
  // Extract numeric values and units from strings like "25g"
  const extractValueAndUnit = (value: string | undefined) => {
    if (!value) return { value: 0, unit: 'g' };
    const match = value.match(/(\d+)(\w+)?/);
    return { 
      value: match ? parseInt(match[1], 10) : 0, 
      unit: match && match[2] ? match[2] : 'g'
    };
  };

  const carbs = extractValueAndUnit(macronutrients.carbohydrates);
  const protein = extractValueAndUnit(macronutrients.protein);
  const fiber = extractValueAndUnit(macronutrients.fiber);

  // Calculate percentages (example calculations - you may need to adjust based on your app's requirements)
  const dailyCalories = 2000;
  const dailyCarbs = 200;
  const dailyProtein = 80;
  const dailyFiber = 30;
  const carbsPercent = Math.round((carbs.value/dailyCarbs) * 100); 
  const proteinPercent = Math.round((protein.value/dailyProtein) * 100);
  const fiberPercent = Math.round((fiber.value/dailyFiber) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.calorieCircle}>
        <Text style={styles.calorieValue}>{calories}</Text>
        <Text style={styles.calorieLabel}>calories</Text>
      </View>

      <Text style={styles.dailyGoalsHeader}>% of Daily Goals</Text>

      {/* Carbohydrates Bar */}
      <View style={styles.macroContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, styles.carbBar, { width: `${Math.min(carbsPercent, 100)}%` }]} />
        </View>
        <View style={styles.macroTextRow}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <View style={styles.macroValueContainer}>
            <Text style={styles.macroValue}>{carbs.value}{carbs.unit}</Text>
            <Text style={styles.percentValue}>{carbsPercent}%</Text>
          </View>
        </View>
      </View>

      {/* Protein Bar */}
      <View style={styles.macroContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, styles.proteinBar, { width: `${Math.min(proteinPercent, 100)}%` }]} />
        </View>
        <View style={styles.macroTextRow}>
          <Text style={styles.macroLabel}>Protein</Text>
          <View style={styles.macroValueContainer}>
            <Text style={styles.macroValue}>{protein.value}{protein.unit}</Text>
            <Text style={styles.percentValue}>{proteinPercent}%</Text>
          </View>
        </View>
      </View>

      {/* Fiber Bar */}
      <View style={styles.macroContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, styles.fiberBar, { width: `${Math.min(fiberPercent, 100)}%` }]} />
        </View>
        <View style={styles.macroTextRow}>
          <Text style={styles.macroLabel}>Fiber</Text>
          <View style={styles.macroValueContainer}>
            <Text style={styles.macroValue}>{fiber.value}{fiber.unit}</Text>
            <Text style={styles.percentValue}>{fiberPercent}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  calorieCircle: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#FFC107',
    marginBottom: 15,
    borderRightColor: '#FF5252',
    borderTopColor: '#FF9800',
    borderLeftColor: '#FFC107',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  calorieLabel: {
    fontSize: 14,
    color: '#1B4332',
  },
  dailyGoalsHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 10,
  },
  macroRow: {
    height: 40,
    marginBottom: 10,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  macroContainer: {
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    left: 0,
    borderRadius: 6,
  },
  macroTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carbBar: {
    backgroundColor: '#FAD759', // Yellow
  },
  proteinBar: {
    backgroundColor: '#F24C5F', // Red
  },
  fiberBar: {
    backgroundColor: '#FB9702', // Orange
  },
  macroLabel: {
    color: '#333',
    fontWeight: '500',
    fontSize: 13,
  },
  macroValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroValue: {
    marginRight: 3,
    color: '#333',
    fontSize: 13,
  },
  percentValue: {
    fontWeight: 'bold',
    color: '#333',
    width: 40,
    textAlign: 'right',
    fontSize: 13,
  },
});

export default RecipeMacro;
