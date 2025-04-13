import { ImageSourcePropType } from 'react-native';

export const getRecipeSwipeImage = (imageName: any): ImageSourcePropType => {
    const images: {[key: string]: ImageSourcePropType} = {
      avocadoTomatoToast: require('../assets/Recipe/avocado tomato toast swipe.png'),
      pumpkinSoup: require('../assets/Recipe/pumpkin soup swipe.png'),
      salmonRiceBowl: require('../assets/Recipe/salmon rice bowl swipe.png'),
      greekYogurtDip: require('../assets/Recipe/greek yogurt dip swipe.png'),
      shrimpVeggieStirFry: require('../assets/Recipe/shrimp veggie stir fry swipe.png'),
      // Add more image mappings as needed
    };
    
    return images[imageName]
  };
