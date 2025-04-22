import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
};

const Checkbox = ({ checked, onPress }: CheckboxProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <View style={styles.innerCheck} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#2E7D32',
  },
  innerCheck: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 2,
  },
});

export default Checkbox; 