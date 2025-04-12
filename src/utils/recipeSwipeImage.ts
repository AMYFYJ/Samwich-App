import { ImageSourcePropType } from 'react-native';

export const getRecipeSwipeImage = (imageName: any): ImageSourcePropType => {
    const images: {[key: string]: ImageSourcePropType} = {
      avocadoEggSandwich: require('../assets/Recipe/avocado tomato toast swipe.png'),
      pumpkinSoup: require('../assets/Recipe/pumpkin soup swipe.png'),
      salmonRiceBowl: require('../assets/Recipe/salmon rice bowl swipe.png'),
      // Add more image mappings as needed
    };
    
    return images[imageName]
  };
