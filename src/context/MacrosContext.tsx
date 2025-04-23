import React, { createContext, useContext, useState, useEffect } from 'react';
import macrosJson from '../../sample_data/Macros.json';

// Define the macros data structure
export interface MacrosData {
  totalCalories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
}

// Define the context type
interface MacrosContextType {
  macros: MacrosData;
  updateMacros: (recipeMacros: MacrosData) => void;
  resetMacros: () => void;
}

// Create the context
const MacrosContext = createContext<MacrosContextType | undefined>(undefined);

// Create the provider component
export const MacrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize macros state with sample data
  const [macros, setMacros] = useState<MacrosData>(macrosJson.currentMacros);

  // Function to update macros with recipe macros
  const updateMacros = (recipeMacros: MacrosData) => {
    console.log('MacrosContext - Updating with recipe macros:', recipeMacros);
    console.log('MacrosContext - Previous macros:', macros);
    
    setMacros(prevMacros => {
      const updatedMacros = {
        totalCalories: prevMacros.totalCalories + recipeMacros.totalCalories,
        carbs: prevMacros.carbs + recipeMacros.carbs,
        protein: prevMacros.protein + recipeMacros.protein,
        fat: prevMacros.fat + recipeMacros.fat,
        fiber: prevMacros.fiber + recipeMacros.fiber,
      };
      
      console.log('MacrosContext - Updated macros:', updatedMacros);
      return updatedMacros;
    });
  };

  // Function to reset macros to initial values
  const resetMacros = () => {
    setMacros(macrosJson.currentMacros);
  };

  return (
    <MacrosContext.Provider value={{ macros, updateMacros, resetMacros }}>
      {children}
    </MacrosContext.Provider>
  );
};

// Create a hook for using the macros context
export const useMacros = () => {
  const context = useContext(MacrosContext);
  if (context === undefined) {
    throw new Error('useMacros must be used within a MacrosProvider');
  }
  return context;
}; 