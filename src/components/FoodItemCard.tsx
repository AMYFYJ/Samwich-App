// src/components/FoodItemCard.tsx
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageSourcePropType, // Use this type for image sources
    Dimensions,
} from 'react-native';

// Define the props the component will accept
interface FoodItemCardProps {
    name: string;
    quantity: string;
    expiry: string;
    image?: ImageSourcePropType | null;
    style?: object;
}

// Calculate item width
// // If used outside a 3-column grid, width might need to be passed as prop or handled differently
// const { width } = Dimensions.get('window');
// const cardHorizontalPadding = 10;
// // Assuming the card will still primarily be used in a context where some margin is desired
// const cardMargin = 5; // This might be better applied *outside* the component in the FlatList columnWrapperStyle or contentContainerStyle
// const cardWidth = (width / 3) - (cardHorizontalPadding * 2) - (cardMargin * 2); // Approx width for 3 columns


export function FoodItemCard({ name, quantity, expiry, image, style}: FoodItemCardProps) {
    return (
        <View style={[styles.itemCardContainer, style]}>
            {/* Use actual Image component if imageUrl is provided */}
            {image ? (
                <Image source={image} style={styles.itemImage} resizeMode="contain" />
            ) : (
                <View style={styles.itemImagePlaceholder} />
            )}
            <Text style={styles.itemName}>{name}</Text>
            <View style={styles.itemInfoContainer}>
                {/* Quantity Tag */}
                <View style={[styles.itemTagBase, styles.itemTagQuantity]}>
                    <Text style={styles.itemTagText}>{quantity}</Text>
                </View>
                {/* Expiry Tag */}
                <View style={[styles.itemTagBase, styles.itemTagExpiry]}>
                    <Text style={styles.itemTagText}>{expiry}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemCardContainer: {
        backgroundColor: '#FFFAF5',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginBottom: 10, // vertical spacing between rows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
    },
    itemImage: { // Style for actual image
        width: 50,
        height: 50,
        marginBottom: 7,
    },
    itemImagePlaceholder: { // Style for placeholder if no image
        width: 70,
        height: 70,
        borderRadius: 10, // Keep placeholder style consistent or match image style
        backgroundColor: '#E0E0E0',
        marginBottom: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004D40',
        textAlign: 'center',
        marginBottom: 7,
        flexWrap: 'wrap',
    },
    itemInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexWrap: 'wrap', // Allow tags to wrap on very narrow screens if needed
    },
    itemTagBase: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginHorizontal: 1,
        marginVertical: 2, // vertical margin for wrapping cases
    },
    itemTagQuantity: {
        backgroundColor: '#D7FFF4',
    },
    itemTagExpiry: {
        backgroundColor: '#FFF9C4',
    },
    itemTagText: {
        fontSize: 9,
        color: '#333333',
        fontWeight: '500',
    },
});

// Optional: Export default for easier importing
// export default FoodItemCard;