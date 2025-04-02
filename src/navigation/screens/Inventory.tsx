import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Inventory() {
  return (
    <View style={styles.container}>
      <Text>Hello, Jane! This is your inventory.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
