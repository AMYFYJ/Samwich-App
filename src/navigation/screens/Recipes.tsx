import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export function Recipes() {
  return (
    <View style={styles.container}>
      <Text> Hello, Jane! Here are your recipes.</Text>
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