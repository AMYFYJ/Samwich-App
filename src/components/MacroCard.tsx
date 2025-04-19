// src/components/MacrosCard.tsx
import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, Dimensions } from 'react-native';
// import Pie from 'react-native-pie'; // REMOVED
import { PieChart } from "react-native-chart-kit"; // Import PieChart

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

// Arc component to draw each pie slice via two half-circle borders and a mask - REMOVED
// const Arc: React.FC<{ startAngle: number; sweepAngle: number; color: string }> = ({ startAngle, sweepAngle, color }) => { ... }; // REMOVED

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
  // Calculate total grams of all macros
  const totalGrams = carbs + protein + fat + fiber;
  
  // Handle case where totalGrams is 0 to avoid division by zero
  const safeTotalGrams = totalGrams > 0 ? totalGrams : 1;
  
  // Calculate percentages for each macro
  const carbsPercentage = (carbs / safeTotalGrams) * 100;
  const proteinPercentage = (protein / safeTotalGrams) * 100;
  const fatPercentage = (fat / safeTotalGrams) * 100;
  const fiberPercentage = (fiber / safeTotalGrams) * 100;
  
  // Data for react-native-chart-kit PieChart
  // Requires name, population (value), color, and legendFontColor/legendFontSize
  const chartData = [
    { name: 'Carbs', population: carbs, color: '#FAD759', legendFontColor: "#FFFFFF", legendFontSize: 10 },
    { name: 'Protein', population: protein, color: '#FB9702', legendFontColor: "#FFFFFF", legendFontSize: 10 },
    { name: 'Fat', population: fat, color: '#F24C5F', legendFontColor: "#FFFFFF", legendFontSize: 10 },
    { name: 'Fiber', population: fiber, color: '#372E3D', legendFontColor: "#FFFFFF", legendFontSize: 10 },
  ].filter(item => item.population > 0);

  // Chart configuration
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  // Compute dynamic label positions for each slice
  let cumulativeAngle = 0;
  const labelElements = chartData.map((item, index) => {
    const arcAngle = (item.population / safeTotalGrams) * 360;
    const midAngle = cumulativeAngle + arcAngle / 2;
    cumulativeAngle += arcAngle;
    
    const centerX = 72;
    const centerY = 108;
    const labelRadius = 140;
    const verticalScale = 0.9;
    const angleRad = (midAngle - 90) * (Math.PI / 180);
    const x = centerX + labelRadius * Math.cos(angleRad);
    const y = centerY + (labelRadius * verticalScale) * Math.sin(angleRad);
    
    return (
      <Text key={index} style={[styles.dynamicLabel, { position: 'absolute', left: x, top: y }]}> 
        {item.name}: {item.population}g 
      </Text>
    );
  });

  return (
    <View style={[styles.cardContainer, style]}>
      <Text style={[styles.title, titleStyle]}>Today's Macros</Text>
      <View style={styles.chartArea}>
        {/* Donut Container with dynamic labels */}
        <View style={styles.donutContainer}>
          {/* PieChart component */}
          <PieChart
            data={chartData}
            width={250} // Width of the chart
            height={250} // Height of the chart
            chartConfig={chartConfig}
            accessor={"population"} // Key to extract values from data
            backgroundColor={"transparent"} // Make background transparent
            paddingLeft={"0"} 
            absolute // Use absolute values instead of percentages
            center={[63, 8]} // center the chart
            hasLegend={false} 
          />
          {labelElements}
          {/* Center circle content */}
          <View style={styles.innerCircleContent}>
            <Text style={styles.centerText}>{totalCalories}</Text>
            <Text style={styles.totalText}>Total Calories</Text>
          </View>
        </View>
        {/* Removed static labels that were previously here */}
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
    marginBottom: 30,
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
    // No specific background needed here now
  },
  innerCircleContent: {
    position: 'absolute',
    width: 140, // fixed width for the inner circle
    height: 140, // fixed height for the inner circle
    borderRadius: 100, // half of width/height for a perfect circle
    backgroundColor: '#355E3B', // same as background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5, // ensure it overlays the PieChart
    top: '49.5%',
    left: '45.5%',
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },

  // Labels around the donut
  label: {
    color: '#FFFFFF',
    fontSize: 12,
    position: 'absolute',
  },
  labelCarbs: { top: 45, right: -55 },
  labelProtein: { bottom: 10, left: -10 },
  labelFat: { top: 60, left: -45 },
  labelFiber: { top: -5, left: 0 },

  centerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    bottom: 3,

  },
  totalText: {
    fontSize: 13,
    color: '#FFFFFF',
  },

  dynamicLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontStyle: 'italic'
  },
});

export default MacrosCard;