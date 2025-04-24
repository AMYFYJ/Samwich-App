import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import foodMacros from '../../sample_data/FoodMacros.json';

type FoodMacrosType = typeof foodMacros;

type Ingredient = {
  name: string;
  quantity: string;
  unit?: string;
};

type RecipeIngreSelectionProps = {
  ingredients: string[];
  serves: number;
  onIngredientsChange?: (ingredients: Ingredient[]) => void;
  foodInventory?: Array<{id: string, name: string, quantity: string, expiry: number, imageName: string}>;
  updateFoodInventory?: (updatedInventory: Array<{id: string, name: string, quantity: string, expiry: number, imageName: string}>) => void;
  initialMacros: {
    calories: number;
    carbohydrates: number;
    protein: number;
    fiber: number;
    fat: number;
  };
  onMacroChange?: (macros: {
    calories: number;
    carbohydrates: number;
    protein: number;
    fiber: number;
    fat: number;
  }) => void;
};

const RecipeIngreSelection = ({ 
  ingredients, 
  serves, 
  onIngredientsChange,
  foodInventory = [],
  updateFoodInventory,
  onMacroChange,
  initialMacros
}: RecipeIngreSelectionProps) => {
  // Helper function to clean ingredient names (remove leading numbers)
  const cleanIngredientName = (name: string) => {
    return name.replace(/^\d+\s*/, '').trim();
  };

  // Add a function to extract quantity from ingredient string
  const extractQuantityFromIngredient = (ingredient: string): string => {
    const match = ingredient.match(/^(\d+(\.\d+)?)\s*/);
    return match ? match[1] : '1'; // Return the found quantity or default to '1'
  };

  // Update the initial state
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempIngredientsList, setTempIngredientsList] = useState<Ingredient[]>([]);

  // Add a ref to track original ingredient quantities
  const originalIngredientsList = useRef<Ingredient[]>([]);

  // Update useEffect to store original quantities when ingredients change
  useEffect(() => {
    const processedIngredients = ingredients.map(ing => ({
      name: cleanIngredientName(ing),
      quantity: extractQuantityFromIngredient(ing),
    }));
    
    setIngredientsList(processedIngredients);
    originalIngredientsList.current = JSON.parse(JSON.stringify(processedIngredients));
  }, [ingredients]);

  const updateQuantity = (index: number, quantity: string) => {
    const updatedIngredients = [...tempIngredientsList];
    updatedIngredients[index].quantity = quantity;
    setTempIngredientsList(updatedIngredients);
  };

  // Only calculate differences
  const calculateUpdatedMacros = (newIngredients: Ingredient[], originalMacros: any) => {
    // Start with original macros
    const updatedMacros = { ...originalMacros };
    
    // Find ingredients that changed quantity
    newIngredients.forEach((newIngredient, index) => {
      const originalIngredient = originalIngredientsList.current[index];
      
      // Only process ingredients where quantity changed
      if (newIngredient.quantity !== originalIngredient.quantity) {
        const normalizedName = newIngredient.name.toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^a-z0-9]/g, '');
        
        const matchingIngredient = Object.keys(foodMacros).find(key => {
          const keyNormalized = key.toLowerCase();
          return keyNormalized === normalizedName || 
                 normalizedName.includes(keyNormalized) || 
                 keyNormalized.includes(normalizedName);
        });
        
        if (matchingIngredient) {
          const macroData = foodMacros[matchingIngredient as keyof FoodMacrosType];
          const newQty = parseFloat(newIngredient.quantity) || 0;
          const oldQty = parseFloat(originalIngredient.quantity) || 0;
          const qtyDifference = newQty - oldQty;
          
          console.log(`${newIngredient.name}: changed from ${oldQty} to ${newQty}, diff=${qtyDifference}`);
          
          // Apply the difference
          updatedMacros.calories += macroData.calories * qtyDifference;
          updatedMacros.carbohydrates += macroData.carbohydrates * qtyDifference;
          updatedMacros.protein += macroData.protein * qtyDifference;
          updatedMacros.fiber += macroData.fiber * qtyDifference;
          updatedMacros.fat += (macroData.fat || 0) * qtyDifference;
          console.log('updatedMacros', updatedMacros);
        }
      }
    });
    
    // Round values
    return {
      calories: Math.round(updatedMacros.calories),
      carbohydrates: Math.round(updatedMacros.carbohydrates),
      protein: Math.round(updatedMacros.protein),
      fiber: Math.round(updatedMacros.fiber),
      fat: Math.round(updatedMacros.fat)
    };
  };

  const handleConfirmEdits = () => {
    setModalVisible(false);
    setIngredientsList(tempIngredientsList);
    
    if (onIngredientsChange) {
      onIngredientsChange(tempIngredientsList);
    }
    
    // Only calculate and pass macros if we have a callback
    if (onMacroChange) {
      // Calculate updated macros based on current ingredient list
      const updatedMacros = calculateUpdatedMacros(tempIngredientsList, initialMacros);
      onMacroChange(updatedMacros);
    }
    
    // Deduct quantities from food inventory
    if (foodInventory.length > 0 && updateFoodInventory) {
      const updatedInventory = [...foodInventory];
      
      tempIngredientsList.forEach(ingredient => {
        // Find matching item in inventory
        const inventoryItem = updatedInventory.find(
          item => item.name.toLowerCase() === ingredient.name.toLowerCase()
        );
        
        if (inventoryItem) {
          // Parse quantities
          const currentQuantity = parseInt(inventoryItem.quantity.split(' ')[0]);
          const selectedQuantity = parseFloat(ingredient.quantity);
          
          // Calculate new quantity
          const newQuantity = Math.max(0, currentQuantity - selectedQuantity);
          
          // Update inventory item
          inventoryItem.quantity = `${newQuantity} left`;
        }
      });
      
      // Update the inventory
      updateFoodInventory(updatedInventory);
    }
  };

  const handleOpenModal = () => {
    setTempIngredientsList(JSON.parse(JSON.stringify(ingredientsList)));
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.servesText}>Serves {serves}</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleOpenModal}
        >
          <Feather name="edit" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>
      
      {ingredientsList.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItem}>
            {ingredient.quantity} {ingredient.unit || ''} {ingredient.name}
          </Text>
        </View>
      ))}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ingredients Used</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.closeX}>X</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalServesText}>Serves {serves}</Text>
            
            <FlatList
              data={tempIngredientsList}
              keyExtractor={(_, index) => index.toString()}
              style={styles.modalScroll}
              removeClippedSubviews={false}
              renderItem={({ item, index }) => (
                <View style={styles.modalItem}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => {
                        const currentQty = parseFloat(item.quantity);
                        if (currentQty > 1) {
                          updateQuantity(index, (currentQty - 1).toString());
                        }
                      }}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>
                      {item.quantity} {item.unit || ''}
                    </Text>
                    
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => {
                        const currentQty = parseFloat(item.quantity);
                        updateQuantity(index, (currentQty + 1).toString());
                      }}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </View>
              )}
            />
            
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmEdits}
            >
              <Text style={styles.confirmButtonText}>Confirm Edits</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 22,
    color: '#2E7D32',
    fontWeight: 'bold',
    flex: 1,
  },
  servesText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginRight: 10,
  },
  editButton: {
    padding: 5,
    marginLeft: 25,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 20,
    color: '#333',
    marginRight: 5,
  },
  listItem: {
    fontSize: 15,
    color: '#333',
    marginLeft: 5,
    lineHeight: 24,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'visible',
  },
  modalHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeX: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  modalServesText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  modalScroll: {
    width: '100%',
    marginBottom: 10,
    zIndex: 1,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    width: '100%',
    zIndex: 1,
  },
  modalItemText: {
    fontSize: 17,
    color: '#333',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 3,
    marginRight: 10,
    minWidth: 150,
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: '#2E7D32',
    height: 30,
    width: 30,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 22,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    minWidth: 40,
  },
  confirmButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeIngreSelection;
