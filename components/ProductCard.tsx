import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { primaryColors, whiteColors } from "../constants/GlobalConstants";
import { Product } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onPress: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onPress,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const rotateX = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.92, {
      damping: 15,
      stiffness: 150,
    });
    rotateX.value = withSpring(5, {
      // Tilt back 5 degrees
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    rotateX.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    heartScale.value = withSpring(
      1.3,
      {
        damping: 10,
        stiffness: 200,
      },
      () => {
        heartScale.value = withSpring(1);
      },
    );
  };

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(scale.value, [0.92, 1], [0.1, 0.25]);

    return {
      transform: [
        { perspective: 1000 },
        { scale: scale.value },
        { rotateX: `${rotateX.value}deg` },
      ],
      shadowOpacity,
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  return (
    <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(product)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Product Image with Favorite Button */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]} />
          )}

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Animated.View style={heartAnimatedStyle}>
              <MaterialCommunityIcons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? "#FF3B30" : whiteColors}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={16}
              color={whiteColors}
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    gap: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
  },
  card: {
    backgroundColor: whiteColors,
    borderRadius: 20,
    overflow: "hidden",
    gap: 16,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    backgroundColor: "#e0e0e0",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  details: {
    padding: 14,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1a1a1a",
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColors,
    marginBottom: 10,
  },
  button: {
    backgroundColor: primaryColors,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    shadowColor: primaryColors,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: whiteColors,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default ProductCard;
