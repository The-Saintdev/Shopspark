import {
  highlightColors,
  primaryColors,
  secondaryColors,
  whiteColors,
} from "@/constants/GlobalConstants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Sci-fi Dark Theme Constants (Local overrides for this specific "Sci-fi" look)
const DARK_BG = "#050510";
const CARD_BG = "#0f0f1f";
const NEON_GLOW = primaryColors;
const CYAN_GLOW = highlightColors;

const CATEGORIES = [
  { id: "1", name: "Cyberware", icon: "chip" },
  { id: "2", name: "Drones", icon: "robot" },
  { id: "3", name: "Energy", icon: "flash" },
  { id: "4", name: "Optics", icon: "eye" },
  { id: "5", name: "Storage", icon: "harddisk" },
];

const FEATURED = [
  {
    id: "1",
    title: "NEURO LINK 2.0",
    subtitle: "Upgrade Your Mind",
    image: "https://via.placeholder.com/300x150/003300/00ff00?text=NEURO+LINK",
  },
  {
    id: "2",
    title: "QUANTUM CORE",
    subtitle: "Unlimited Power",
    image: "https://via.placeholder.com/300x150/000033/00ffff?text=QUANTUM",
  },
];

const PRODUCTS = [
  {
    id: "1",
    name: "X-1 Visualizer",
    price: "IDR 2.5M",
    category: "Optics",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Nano-Swarm",
    price: "IDR 15.0M",
    category: "Drones",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Plasma Cell",
    price: "IDR 500K",
    category: "Energy",
    rating: 4.5,
  },
  {
    id: "4",
    name: "Data Shard",
    price: "IDR 125K",
    category: "Storage",
    rating: 4.2,
  },
];

export default function Home() {
  const renderCategory = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryContainer}>
      <View style={styles.categoryIconBox}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={28}
          color={NEON_GLOW}
        />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

const renderProduct = ({ item }: any) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImagePlaceholder}>
        <MaterialCommunityIcons
          name="cube-scan"
          size={40}
          color={CYAN_GLOW}
          style={{ opacity: 0.5 }}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={10} color={DARK_BG} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.addBtn}>
        <MaterialCommunityIcons name="plus" size={20} color={DARK_BG} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>WELCOME BACK,</Text>
            <Text style={styles.userText}>COMMANDER</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={whiteColors}
            />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[secondaryColors, DARK_BG]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBanner}
          >
            <View style={styles.heroContent}>
              <View style={styles.newTag}>
                <Text style={styles.newTagText}>NEW ARRIVAL</Text>
              </View>
              <Text style={styles.heroTitle}>CYBER ARM V5</Text>
              <Text style={styles.heroSubtitle}>
                Enhanced strength & dexterity.
              </Text>
              <TouchableOpacity style={styles.shopNowBtn}>
                <Text style={styles.shopNowText}>ACQUIRE NOW</Text>
              </TouchableOpacity>
            </View>
            <MaterialCommunityIcons
              name="arm-flex"
              size={100}
              color={whiteColors}
              style={styles.heroIcon}
            />
          </LinearGradient>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SECTORS</Text>
          <Text style={styles.seeAll}>View All</Text>
        </View>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Popular Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>POPULAR ITEMS</Text>
        </View>
        <View style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <View key={product.id} style={{ width: "48%", marginBottom: 15 }}>
              {renderProduct({ item: product })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  welcomeText: {
    color: "#889",
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  userText: {
    color: whiteColors,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: "#333",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: NEON_GLOW,
  },

  // Hero
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  heroBanner: {
    height: 180,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: secondaryColors,
    overflow: "hidden",
  },
  heroContent: {
    flex: 1,
    zIndex: 2,
  },
  newTag: {
    backgroundColor: NEON_GLOW,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  newTagText: {
    color: DARK_BG,
    fontWeight: "bold",
    fontSize: 10,
  },
  heroTitle: {
    color: whiteColors,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    textShadowColor: NEON_GLOW,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 15,
  },
  shopNowBtn: {
    backgroundColor: whiteColors,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  shopNowText: {
    color: DARK_BG,
    fontWeight: "bold",
    fontSize: 12,
  },
  heroIcon: {
    position: "absolute",
    right: -20,
    bottom: -20,
    opacity: 0.2,
    transform: [{ rotate: "-15deg" }],
  },

  // Categories
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    color: whiteColors,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    borderLeftWidth: 3,
    borderLeftColor: CYAN_GLOW,
    paddingLeft: 10,
  },
  seeAll: {
    color: CYAN_GLOW,
    fontSize: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  categoryContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CARD_BG,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: NEON_GLOW,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  categoryText: {
    color: "#889",
    fontSize: 12,
  },

  // Products
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  productImagePlaceholder: {
    height: 100,
    backgroundColor: "#0a0a15",
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    marginBottom: 5,
  },
  productCategory: {
    color: CYAN_GLOW,
    fontSize: 10,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  productName: {
    color: whiteColors,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    color: NEON_GLOW,
    fontWeight: "bold",
    fontSize: 14,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: whiteColors,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: DARK_BG,
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 2,
  },
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: NEON_GLOW,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
