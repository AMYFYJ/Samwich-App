// IngredientItem.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

// Define the props the component expects
type IngredientSelectionProps = {
  initialQuantity: string;
  ingredientName: string;
  quantityOptions: string[];
  onQuantityChange: (newQuantity: string) => void;
  onClose?: () => void;  // Optional callback for closing
};

const screenHeight = Dimensions.get('window').height;

const IngredientItem: React.FC<IngredientSelectionProps> = ({
  initialQuantity,
  ingredientName,
  quantityOptions,
  onQuantityChange,
  onClose,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(initialQuantity);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectQuantity = (quantity: string) => {
    setSelectedQuantity(quantity);
    onQuantityChange(quantity);
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    onClose?.();
  };

  // Determine background color based on quantity
  const quantityStyle = /\d+(\.\d+)?\s*(slice|tsp|tbsp)/.test(selectedQuantity)
    ? styles.quantityBoxColored
    : styles.quantityBoxGray;

  return (
    <View style={styles.row}>
      <Text style={styles.bullet}>•</Text>

      <TouchableOpacity
        style={[styles.quantityBoxBase, quantityStyle]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.quantityText}>{selectedQuantity}</Text>
        <Text style={styles.dropdownArrow}>▾</Text>
      </TouchableOpacity>

      <Text style={styles.ingredientName}>{ingredientName}</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleClose}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={handleClose}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            <Pressable>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Quantity</Text>
                <ScrollView style={styles.modalScrollView}>
                  {quantityOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleSelectQuantity(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Space between ingredient lines
    paddingHorizontal: 5, // Padding for the row
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    color: '#555',
    width: 15, // Fixed width for alignment
    textAlign: 'center',
  },
  quantityBoxBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15, // Rounded corners
    marginRight: 10, // Space between quantity and ingredient name
    minWidth: 80, // Minimum width to prevent being too small
    justifyContent: 'center', // Center text inside
  },
  quantityBoxColored: {
     backgroundColor: '#E0F2E9', // Light greenish color
  },
  quantityBoxGray: {
    backgroundColor: '#F0F0F0', // Light gray color
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5, // Space before arrow
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#555',
  },
  ingredientName: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1, // Allow text to wrap if needed
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
   modalSafeArea: {
    width: '85%', // Modal width
    maxHeight: screenHeight * 0.6, // Max height 60% of screen
    backgroundColor: '#fff',
    borderRadius: 10,
    // Required on Android to prevent StatusBar issues within modal
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    overflow: 'hidden', // Ensures content respects border radius
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalScrollView: {
    // Takes available space within the maxHeight constraint
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
  closeButton: {
      marginTop: 15,
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
});

export default IngredientItem;