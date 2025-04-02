import React from 'react';
import {
  StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { FoodItemCard } from '../../components/FoodItemCard'; // Adjust path as needed


// --- Sample Data (Replace with actual data fetching) ---
type ExpiringItem = {
  id: string;
  name: string;
  quantity: string;
  expiry: string;
  image: any;
};

const expiringItemsData: ExpiringItem[] = [
  { id: '1', name: 'Pumpkin', quantity: '2 left', expiry: 'Expires in 3 days', image: null },
  { id: '2', name: 'Eggs', quantity: '6 left', expiry: 'Expires in 1 day', image: null },
  { id: '3', name: 'Greek Yoghurt', quantity: '2 left', expiry: 'Expires in 2 days', image: null },
  { id: '4', name: 'Shrimp', quantity: '6 left', expiry: 'Expires in 1 day', image: null },
  { id: '5', name: 'Salmon', quantity: '1 left', expiry: 'Expires in 2 days', image: null },
  { id: '6', name: 'Yellow Pepper', quantity: '1 left', expiry: 'Expires in 2 days', image: null },
];

const quickRecipeData = {
    id: '1',
    name: 'Avocado Egg Sandwich',
    uses: 'avocados, eggs, white bread, fresh thyme',
    consume: 'Consume within 2 days',
    image: null // Replace null with image source
};
// --- End Sample Data ---


export function Home() {

  // --- Render Function for Grid Item ---
  const renderExpiringItem = ({ item }: { item: ExpiringItem }) => (
    <FoodItemCard
        name={item.name}
        quantity={item.quantity}
        expiry={item.expiry}
        // Removed explicit width/margin setting here, handled inside or via FlatList spacing
    />
);
  // --- End Render Function ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        {/* === Today's Macros Section === */}
        <View style={[styles.sectionContainer, styles.macrosContainer]}>
          <Text style={[styles.sectionTitle, styles.macrosTitle]}>Today's Macros</Text>
          <View style={styles.macrosChartArea}>
             {/* Donut Chart Placeholder */}
            <View style={styles.macrosChartPlaceholder}>
                <Text style={styles.macrosCenterText}>1440</Text>
                <Text style={styles.macrosTotalText}>Total Calories</Text>
            </View>
             {/* Labels - Position these more accurately with absolute positioning or flex arrangement */}
            <Text style={[styles.macrosLabel, styles.macrosLabelCarbs]}>Carbohydrates: 136g</Text>
            <Text style={[styles.macrosLabel, styles.macrosLabelProtein]}>Protein: 48g</Text>
            <Text style={[styles.macrosLabel, styles.macrosLabelFiber]}>Fiber: 36g</Text>
          </View>
        </View>

        {/* === Items Expiring Soon Section === */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Items Expiring Soon</Text>
          <FlatList
            data={expiringItemsData}
            renderItem={renderExpiringItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            style={styles.itemsGrid} // Keep or remove if no specific style needed
            contentContainerStyle={styles.gridContentContainer} // Use for padding around grid items
            // columnWrapperStyle={styles.gridRow} // Use for spacing between items in a row if needed
            scrollEnabled={false}
          />
        </View>

        {/* === Quick Recipes Section === */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Recipes</Text>
          <View style={styles.recipeCardContainer}>
            {/* Replace View with Image */}
            <View style={styles.recipeImagePlaceholder} />
            <View style={styles.recipeDetails}>
              <Text style={styles.recipeTitle}>{quickRecipeData.name}</Text>
              <Text style={styles.recipeUses}>Uses: {quickRecipeData.uses}</Text>
              <View style={styles.recipeFooter}>
                 <Text style={styles.recipeConsume}>{quickRecipeData.consume}</Text>
                 <TouchableOpacity style={styles.useNowButton}>
                    <Text style={styles.useNowButtonText}>Use now ▸</Text>
                 </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F0', // Light beige background for whole screen
  },
  scrollViewContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 15,
  },
  // Macros Section
  macrosContainer: {
    backgroundColor: '#4A7C59', // Darker green background
    borderRadius: 15,
    padding: 20,
    alignItems: 'center', // Center title and chart area
  },
   macrosTitle: {
    color: '#FFFFFF', // White title text
    textAlign: 'center',
    marginBottom: 20,
  },
  macrosChartArea: {
    // This view helps in positioning labels relative to the chart placeholder
    alignItems: 'center', // Center the placeholder horizontally
    position: 'relative', // Needed for absolute positioning of labels if used
    width: 200, // Example width, adjust as needed
    height: 200, // Example height, adjust as needed
    marginBottom: 10, // Space below the chart area
  },
  macrosChartPlaceholder: {
    width: 160, // Adjust size as needed
    height: 160,
    borderRadius: 80, // Make it a circle
    backgroundColor: '#E0E0E0', // Placeholder color for chart background
    justifyContent: 'center',
    alignItems: 'center',
    // Add specific colors/borders later for actual chart segments
    // Example segments (would be drawn with SVG or a library)
    borderWidth: 20, // Simulate thickness
    borderColor: '#F9A825', // Example outer color (Protein - Yellow)
    // Inner segments would need more complex drawing
  },
  macrosCenterText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
  },
  macrosTotalText: {
      fontSize: 12,
      color: '#555',
  },
  macrosLabel: {
      color: '#FFFFFF', // White label text
      fontSize: 12,
      // Use absolute positioning or adjust flex layout for precise placement
      // Example - adjust these based on final chart layout:
      position: 'absolute',
  },
  macrosLabelCarbs: {
      top: 20, // Adjust as needed
      right: -60, // Adjust as needed
  },
  macrosLabelProtein: {
      bottom: 20, // Adjust as needed
      right: -40, // Adjust as needed
  },
  macrosLabelFiber: {
      top: '40%', // Adjust as needed
      left: -40, // Adjust as needed
  },
  // Items Expiring Soon Section
  itemsGrid: {
    // Removed marginHorizontal adjustments if item card handles its own width/margin
  },
  gridContentContainer: {
      // Example: Add padding if cards don't have outer margins
      // paddingHorizontal: 5,
  },
  
  // Quick Recipes Section
  recipeCardContainer: {
    backgroundColor: '#FFFAF5', // Lighter cream
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row', // Image and details side-by-side
    alignItems: 'center',
    shadowColor: '#000', // Basic shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 10, // Rounded square
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  recipeDetails: {
    flex: 1, // Take remaining space
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recipeUses: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
   recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  recipeConsume: {
    fontSize: 11,
    color: '#D32F2F', // Reddish color for urgency
    fontStyle: 'italic',
  },
  useNowButton: {
    backgroundColor: '#4A7C59', // Green button
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  useNowButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 12,
    fontWeight: 'bold',
  },
});