import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";
import {
  backgroundColors,
  primaryColors,
  whiteColors,
} from "../../constants/GlobalConstants";
import { Product, useCart } from "../../context/CartContext";
import { fetchProductById, fetchProducts } from "../../lib/products";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // ── Live data state ──
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productId = Array.isArray(id) ? id[0] : id;
      const [fetched, allProducts] = await Promise.all([
        fetchProductById(productId),
        fetchProducts(),
      ]);
      setProduct(fetched);
      setSuggestedProducts(
        allProducts.filter((p) => p.id !== productId).slice(0, 4)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // ── Loading state ──
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={primaryColors} />
        <Text style={{ marginTop: 12, color: "#666", fontSize: 15 }}>Loading product…</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.back();
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.push("/checkout");
  };

  const handleProductPress = (selectedProduct: Product) => {
    router.push({
      pathname: "/products/[id]",
      params: { id: selectedProduct.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF3B30" : "#333"}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
        </Animated.View>

        {/* Product Info */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.infoContainer}
        >
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

          {/* Rating (Static for now) */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <MaterialCommunityIcons
                key={star}
                name="star"
                size={20}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingText}>5.0 (128 reviews)</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity Selector */}
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <MaterialCommunityIcons
                name="minus"
                size={20}
                color={primaryColors}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color={primaryColors}
              />
            </TouchableOpacity>
          </View>

          {/* Suggested Products */}
          {suggestedProducts.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>You May Also Like</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestedProducts}
              >
                {suggestedProducts.map((item, index) => (
                  <Animated.View
                    key={item.id}
                    entering={FadeInRight.delay(index * 100 + 300).springify()}
                    style={styles.suggestedProductCard}
                  >
                    <ProductCard
                      product={item}
                      onAddToCart={addToCart}
                      onPress={handleProductPress}
                    />
                  </Animated.View>
                ))}
              </ScrollView>
            </>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={20}
            color={whiteColors}
          />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: whiteColors,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: whiteColors,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    backgroundColor: whiteColors,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    aspectRatio: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: primaryColors,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: whiteColors,
    borderRadius: 12,
    padding: 8,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: "center",
  },
  suggestedProducts: {
    paddingRight: 20,
  },
  suggestedProductCard: {
    width: 180,
    marginRight: 12,
  },
  bottomBar: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: whiteColors,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    gap: 12,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: whiteColors,
    borderWidth: 2,
    borderColor: primaryColors,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    color: primaryColors,
    fontSize: 16,
    fontWeight: "700",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: primaryColors,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: primaryColors,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartText: {
    color: whiteColors,
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
});

export default ProductDetail;
