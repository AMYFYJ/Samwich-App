import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import savedRecipesImage from '../../../assets/Recipe/avocado sandwich.png';
import suggestedRecipesImage from '../../../assets/Recipe/salmon rice bowl.png';
import completedRecipesImage from '../../../assets/Recipe/salad.png';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RecipeCategory = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCategoryPress = (category: string) => {
    if (category === 'SavedRecipes') {
      console.log('Going to Saved Recipes');
      navigation.navigate('HomeTabs', { 
        screen: 'Recipes',
        params: { screen: 'SavedRecipes' }
      });
    } else if (category === 'SuggestedRecipes') {
      console.log('Going to Suggested Recipes');
      navigation.navigate('HomeTabs', { 
        screen: 'Recipes',
        params: { screen: 'SuggestedRecipes' }
      });
    } else if (category === 'CompletedRecipes') {
      console.log('Going to Completed Recipes');
      navigation.navigate('HomeTabs', { 
        screen: 'Recipes',
        params: { screen: 'CompletedRecipes' }
      });
    } else {
      console.warn(`Unknown category: ${category}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.header}>Recipes</Text>

        <View style={styles.categoryContainer}>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => handleCategoryPress('SavedRecipes')}
          >
            <Image 
              source={savedRecipesImage}
              style={styles.categoryImage}
            />
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Saved Recipes</Text>
              <Text style={styles.categorySubtitle}>View your saved recipe collection</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#22543D" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => handleCategoryPress('SuggestedRecipes')}
          >
            <Image 
              source={suggestedRecipesImage}
              style={styles.categoryImage}
            />
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Suggested Recipes</Text>
              <Text style={styles.categorySubtitle}>
                Explore new suggested recipes built to help you hit your daily macro goals
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#22543D" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => handleCategoryPress('CompletedRecipes')}
          >
            <Image 
              source={completedRecipesImage}
              style={styles.categoryImage}
            />
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Completed Recipes</Text>
              <Text style={styles.categorySubtitle}>
                See previously completed recipes and when you've completed them
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#22543D" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Bottom navigation is handled in index.tsx */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#22543D',
    marginVertical: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  categoryContainer: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22543D',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryImage: {
    width:80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
});

export { RecipeCategory };
