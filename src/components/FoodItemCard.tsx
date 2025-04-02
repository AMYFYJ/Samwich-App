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
    imageUrl?: ImageSourcePropType | null; // Make image optional, accept require() or {uri: ...}
    style?: object; // Allow passing additional styles (like margin for grid)
}

// Calculate item width - might need adjustment depending on context
// If used outside a 3-column grid, width might need to be passed as prop or handled differently
const { width } = Dimensions.get('window');
const cardHorizontalPadding = 10;
// Assuming the card will still primarily be used in a context where some margin is desired
const cardMargin = 5; // This might be better applied *outside* the component in the FlatList columnWrapperStyle or contentContainerStyle
const cardWidth = (width / 3) - (cardHorizontalPadding * 2) - (cardMargin * 2); // Approx width for 3 columns


export function FoodItemCard({ name, quantity, expiry, imageUrl, style }: FoodItemCardProps) {
    return (
        <View style={[styles.itemCardContainer, { width: cardWidth }, style]}>
            {/* Use actual Image component if imageUrl is provided */}
            {imageUrl ? (
                <Image source={imageUrl} style={styles.itemImage} resizeMode="contain" />
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
        paddingVertical: 20,
        paddingHorizontal: cardHorizontalPadding, // Use constant
        alignItems: 'center',
        // Removed fixed width/margin here - apply width/margin from props or context
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        // Add margin externally if needed for grid spacing
        margin: cardMargin, // Add margin here if consistently needed around the card
    },
    itemImage: { // Style for actual image
        width: 70,
        height: 70,
        marginBottom: 12,
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
        marginBottom: 12,
    },
    itemInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        flexWrap: 'wrap', // Allow tags to wrap on very narrow screens if needed
    },
    itemTagBase: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginHorizontal: 4,
        marginVertical: 2, // Add vertical margin for wrapping cases
    },
    itemTagQuantity: {
        backgroundColor: '#D7FFF4',
    },
    itemTagExpiry: {
        backgroundColor: '#FFF9C4',
    },
    itemTagText: {
        fontSize: 11,
        color: '#333333',
        fontWeight: '500',
    },
});

// Optional: Export default for easier importing
// export default FoodItemCard;