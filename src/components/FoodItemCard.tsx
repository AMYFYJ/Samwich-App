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
    expiry: number; 
    image?: ImageSourcePropType | null;
    style?: object;
}

// Function to determine expiry color based on days left
const getExpiryColor = (expiry: number): string => {
    if (expiry <= 0) {
        return '#efb4b4'; // Light red
    } else if (expiry <= 4) {
        return '#ffe599'; // light orange
    } else {
        return '#DCEDC8'; // Light green
    }
};


export function FoodItemCard({ name, quantity, expiry, image, style}: FoodItemCardProps) {
    // Get the expiry color dynamically
    const expiryColor = getExpiryColor(expiry);
    
    return (
        <View style={[styles.itemCardContainer, style]}>
            {/* Use actual Image component if imageUrl is provided */}
            {image ? (
                <Image source={image} style={styles.itemImage} resizeMode="contain" />
            ) : (
                <View style={styles.itemImagePlaceholder} />
            )}
            <Text 
                style={styles.itemName}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                {name}
            </Text>
            <View style={styles.itemInfoContainer}>
                {/* Quantity Tag */}
                <View style={[styles.itemTagBase, styles.itemTagQuantity]}>
                    <Text style={styles.itemTagText}>{quantity}</Text>
                </View>
                {/* Expiry Tag - color is now dynamic */}
                <View style={[styles.itemTagBase, { backgroundColor: expiryColor }]}>
                    <Text style={styles.itemTagText}>
                    {/* condition ? valueIfTrue : valueIfFalse */}
                        {expiry < 0 ? 'Expired' : 
                         expiry === 1 ? 'Expires in 1 day' : 
                         `Expires in ${expiry} days`}
                    </Text>
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
        paddingHorizontal: 3,
        alignItems: 'center',
        marginBottom: 10, // vertical spacing between rows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        // Fixed dimensions for consistent card size
        width: 105,
        height: 160,
        justifyContent: 'space-between', // Distributes content evenly
    },
    itemImage: { // Style for actual image
        width: 50,
        height: 50,
        marginBottom: 7,
    },
    itemImagePlaceholder: {
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
        // Limit to 2 lines and add ellipsis if longer
        maxWidth: 95,
    },
    itemInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        padding: 0,
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
        backgroundColor: '#CBF1E2',
    },
    itemTagExpiry: {
        // Keep this for backward compatibility but we'll override it inline
        backgroundColor: '#FFF9C4',
        padding: 0,
    },
    itemTagText: {
        fontSize: 9,
        color: '#333333',
        fontWeight: '500',
    },
});

// Optional: Export default for easier importing
// export default FoodItemCard;