import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialFoodData from '../../sample_data/foods.json';

// Define types
type FoodItem = {
  id: string;
  name: string;
  quantity: string;
  expiry: number;
  imageName: string;
};

type FoodContextType = {
  foodInventory: FoodItem[];
  updateFoodInventory: (updatedInventory: FoodItem[]) => void;
  saveChanges: () => void;
  resetToOriginal: () => void;
};

// Create context
const FoodContext = createContext<FoodContextType | null>(null);

// Provider component
export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodInventory, setFoodInventory] = useState<FoodItem[]>(initialFoodData.foodItemsData);
  
  const resetToOriginal = () => {
    setFoodInventory(initialFoodData.foodItemsData);
  };
  
  // Call resetToOriginal on app mount
  useEffect(() => {
    resetToOriginal();
  }, []);
  
  // Update inventory state
  const updateFoodInventory = (updatedInventory: FoodItem[]) => {
    setFoodInventory(updatedInventory);
  };
  
  // Save changes to persistent storage
  const saveChanges = async () => {
    try {
      await AsyncStorage.setItem('foodInventory', JSON.stringify(foodInventory));
      console.log('Food inventory saved successfully');
    } catch (error) {
      console.error('Error saving food inventory:', error);
    }
  };
  
  return (
    <FoodContext.Provider value={{ 
      foodInventory, 
      updateFoodInventory, 
      saveChanges,
      resetToOriginal
    }}>
      {children}
    </FoodContext.Provider>
  );
};

// Custom hook to use the food context
export const useFoodInventory = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodInventory must be used within a FoodProvider');
  }
  return context;
}; 