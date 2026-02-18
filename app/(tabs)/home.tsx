import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInRight,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryPill from "../../components/CategoryPill";
import ProductCard from "../../components/ProductCard";
import {
  backgroundColors,
  primaryColors,
  whiteColors,
} from "../../constants/GlobalConstants";
import { useAuth } from "../../context/AuthContext";
import { Product, useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { fetchProducts } from "../../lib/products";

// Get greeting based on time of day
const getGreeting = (firstName?: string) => {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour >= 0 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  if (firstName) {
    return `${greeting}, ${firstName}! 👋`;
  }
  return `${greeting}! 👋`;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_WIDTH = SCREEN_WIDTH * 0.85;
const SPACER_WIDTH = (SCREEN_WIDTH - BANNER_WIDTH) / 2;

const BANNERS = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    title: "New Arrivals",
    subtitle: "Shop the Latest Trends",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1472851294608-415522f96319?q=80&w=1000&auto=format&fit=crop",
    title: "Special Deals",
    subtitle: "Limited Time Only",
  },
];

const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Home",
  "Beauty",
];

const Home = () => {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { theme } = useTheme();
  const { profile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollX = useSharedValue(0);
  const bannerRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);

  // ── Live product state ──
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Filter products by search query
  const filteredProducts = searchQuery.trim()
    ? products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : products;

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerRef.current) {
        currentIndexRef.current =
          (currentIndexRef.current + 1) % BANNERS.length;
        bannerRef.current.scrollToIndex({
          index: currentIndexRef.current,
          animated: true,
        });
      }
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleProductPress = (product: Product) => {
    router.push({ pathname: "/products/[id]", params: { id: product.id } });
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const BannerItem = ({ item, index }: { item: any; index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * BANNER_WIDTH,
        index * BANNER_WIDTH,
        (index + 1) * BANNER_WIDTH,
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.9, 1, 0.9],
        Extrapolation.CLAMP
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 1, 0.6],
        Extrapolation.CLAMP
      );

      const rotateY = interpolate(
        scrollX.value,
        inputRange,
        [10, 0, -10], // Rotate slightly for 3D effect
        Extrapolation.CLAMP
      );

      const translateX = interpolate(
        scrollX.value,
        inputRange,
        [20, 0, -20],
        Extrapolation.CLAMP
      );

      return {
        transform: [
          { perspective: 1000 },
          { scale },
          { rotateY: `${rotateY}deg` },
          { translateX },
        ],
        opacity,
        zIndex: index === 1 ? 10 : 1, // Simple zIndex logic for demo
      };
    });

    return (
      <Animated.View style={[styles.bannerWrapper, animatedStyle]}>
        <Image
          source={{ uri: item.image }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
          style={styles.bannerOverlay}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={18}
                color={whiteColors}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const renderHeader = () => (
    <View>
      {/* Header with Greeting */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.greeting, { color: theme.text }]}>
            {getGreeting(profile?.first_name)}
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Find your favorite products
          </Text>
        </View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => router.push("/checkout")}
        >
          <View style={[styles.cartIcon, { backgroundColor: theme.card }]}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={26}
              color={theme.icon}
            />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons
            name="tune-variant"
            size={22}
            color={primaryColors}
          />
        </TouchableOpacity>
      </View>

      {/* 3D Banner Section */}
      <View style={styles.bannerContainer}>
        <Animated.FlatList
          ref={bannerRef}
          data={BANNERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={BANNER_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACER_WIDTH }}
          renderItem={({ item, index }) => (
            <BannerItem item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {CATEGORIES.map((cat, index) => (
          <Animated.View
            key={cat}
            entering={FadeInRight.delay(index * 100 + 400).springify()}
          >
            <CategoryPill
              category={cat}
              isSelected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Popular Products
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ── Loading state ──
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={primaryColors} />
        <Text style={{ marginTop: 12, color: "#666", fontSize: 15 }}>Loading products…</Text>
      </SafeAreaView>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#FF3B30" />
        <Text style={{ marginTop: 12, color: "#666", fontSize: 15, textAlign: "center" }}>
          {error}
        </Text>
        <TouchableOpacity
          style={{ marginTop: 16, backgroundColor: primaryColors, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 }}
          onPress={loadProducts}
        >
          <Text style={{ color: whiteColors, fontWeight: "600" }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filteredProducts}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 150 + 600)
              .springify()
              .damping(12)}
            style={{ flex: 1 }}
          >
            <ProductCard
              product={item}
              onAddToCart={addToCart}
              onPress={handleProductPress}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <MaterialCommunityIcons name="package-variant" size={48} color="#ccc" />
            <Text style={{ marginTop: 12, color: "#999", fontSize: 15 }}>
              {searchQuery ? "No products match your search" : "No products available yet"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors,
    paddingHorizontal: 16,
    paddingBottom: 85,
  },
  header: {
    marginTop: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    fontWeight: "400",
  },
  cartIconContainer: {
    marginRight: 15,
  },
  cartIcon: {
    backgroundColor: whiteColors,
    padding: 12,
    borderRadius: 12,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: backgroundColors,
  },
  badgeText: {
    color: whiteColors,
    fontSize: 11,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: whiteColors,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  filterButton: {
    padding: 4,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    gap: 15,
  },
  bannerContainer: {
    marginBottom: 24,
    height: 220,
    marginHorizontal: -16,
  },
  bannerWrapper: {
    width: BANNER_WIDTH,
    height: 190,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginTop: 10,
    marginRight: 0, // Removed margin as we handle spacing explicitly
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    padding: 24,
  },
  bannerContent: {
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: whiteColors,
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: whiteColors,
    marginBottom: 16,
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  bannerButtonText: {
    color: whiteColors,
    fontSize: 14,
    fontWeight: "700",
    marginRight: 6,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  seeAllText: {
    fontSize: 14,
    color: primaryColors,
    fontWeight: "600",
  },
});
