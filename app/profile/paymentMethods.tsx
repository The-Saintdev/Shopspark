import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const paymentMethods = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ProfileHeader
        title="Payment Methods"
        onpress={() => {
          router.back();
        }}
      />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Default Card Section */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Default Card
          </Text>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="chip"
                size={40}
                color="rgba(255,255,255,0.5)"
              />
              {/* Requested Change: Replace pencil with Visa text */}
              <Text style={styles.visaText}>Visa</Text>
            </View>

            <View style={styles.cardNumberContainer}>
              <View style={styles.dotsContainer}>
                {[...Array(4)].map((_, i) => (
                  <View key={`dot1-${i}`} style={styles.dot} />
                ))}
              </View>
              <View style={styles.gap} />
              <View style={styles.dotsContainer}>
                {[...Array(4)].map((_, i) => (
                  <View key={`dot2-${i}`} style={styles.dot} />
                ))}
              </View>
              <View style={styles.gap} />
              <View style={styles.dotsContainer}>
                {[...Array(4)].map((_, i) => (
                  <View key={`dot3-${i}`} style={styles.dot} />
                ))}
              </View>
              <View style={styles.gap} />
              <Text style={styles.cardNumberText}>4242</Text>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                <Text style={styles.cardHolderName}>ALEX JOHNSON</Text>
              </View>
              <View style={styles.mastercardLogo}>
                <View style={[styles.circle, styles.redCircle]} />
                <View style={[styles.circle, styles.yellowCircle]} />
              </View>
            </View>
          </View>

          {/* Saved Methods Section */}
          <Text
            style={[styles.sectionTitle, { color: theme.text, marginTop: 25 }]}
          >
            Saved Methods
          </Text>

          {/* Method 1: Mastercard */}
          <View style={styles.methodCard}>
            <View style={styles.methodRow}>
              <View style={styles.iconContainer}>
                {/* Placeholder for card icon */}
                <View style={[styles.miniCard, { backgroundColor: "#1a1a1a" }]}>
                  <View
                    style={[
                      styles.miniCircle,
                      { backgroundColor: "#ff5f00", left: 4 },
                    ]}
                  />
                  <View
                    style={[
                      styles.miniCircle,
                      { backgroundColor: "#ea001b", left: 10 },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.methodDetails}>
                <View style={styles.rowBetween}>
                  <Text style={styles.methodTitle}>• • • • 8899</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>CREDIT</Text>
                  </View>
                </View>
                <Text style={styles.methodSubtitle}>Expires 10/25</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.methodActions}>
              <Text style={styles.addedDate}>Added on Jan 12, 2023</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={20}
                    color="#ff4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Method 2: Visa */}
          <View style={styles.methodCard}>
            <View style={styles.methodRow}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="cc-visa" size={24} color="#1a1f71" />
              </View>
              <View style={styles.methodDetails}>
                <View style={styles.rowBetween}>
                  <Text style={styles.methodTitle}>• • • • 5567</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>DEBIT</Text>
                  </View>
                </View>
                <Text style={styles.methodSubtitle}>Expires 01/26</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.methodActions}>
              <Text style={styles.addedDate}>Added on Mar 04, 2023</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={20}
                    color="#ff4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Method 3: Apple Pay */}
          <View style={styles.methodCard}>
            <View style={styles.methodRow}>
              <View
                style={[styles.iconContainer, { backgroundColor: "black" }]}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 10 }}
                >
                  Pay
                </Text>
              </View>
              <View style={styles.methodDetails}>
                <View style={styles.rowBetween}>
                  <Text style={styles.methodTitle}>Apple Pay</Text>
                  <View style={[styles.badge, { backgroundColor: "#e6f0ff" }]}>
                    <Text style={[styles.badgeText, { color: "#0066cc" }]}>
                      WALLET
                    </Text>
                  </View>
                </View>
                <Text style={styles.methodSubtitle}>Connected</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.methodActions}>
              <Text style={styles.addedDate}>iPhone 14 Pro</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="settings-sharp" size={20} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={20}
                    color="#ff4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Method 4: PayPal */}
          <View style={styles.methodCard}>
            <View style={styles.methodRow}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="paypal" size={24} color="#003087" />
              </View>
              <View style={styles.methodDetails}>
                <View style={styles.rowBetween}>
                  <Text style={styles.methodTitle}>PayPal</Text>
                  <View style={[styles.badge, { backgroundColor: "#e6f0ff" }]}>
                    <Text style={[styles.badgeText, { color: "#0066cc" }]}>
                      WALLET
                    </Text>
                  </View>
                </View>
                <Text style={styles.methodSubtitle}>john.doe@email.com</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.methodActions}>
              <Text style={styles.addedDate}>Auto-pay enabled</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={20}
                    color="#ff4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              router.push("/profile/newMethod");
            }}
          >
            <Ionicons
              name="card-outline"
              size={24}
              color="black"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Add New Button - Requested Change: Increased Width */}
      </View>
    </SafeAreaView>
  );
};

export default paymentMethods;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: "#1E3329", // Dark green like reference
    borderRadius: 20,
    padding: 25,
    height: 220,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  visaText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    marginRight: 5,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
  gap: {
    width: 15,
  },
  cardNumberText: {
    color: "white",
    fontSize: 20,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    marginBottom: 4,
    letterSpacing: 1,
    fontWeight: "600",
  },
  cardHolderName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  mastercardLogo: {
    flexDirection: "row",
    opacity: 0.9,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  redCircle: {
    backgroundColor: "rgba(235,0,27, 0.8)",
    marginRight: -12,
    zIndex: 1,
  },
  yellowCircle: {
    backgroundColor: "rgba(247,158,27, 0.8)",
  },
  // Saved Methods Styling
  methodCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  miniCard: {
    width: 24,
    height: 16,
    borderRadius: 2,
    position: "relative",
    overflow: "hidden",
  },
  miniCircle: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    top: 2,
  },
  methodDetails: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  badge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#666",
  },
  methodSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  methodActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addedDate: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  // Add New Button
  addButton: {
    backgroundColor: "#2ef082", // Bright green from reference
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: 20,
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 30, // Fully rounded
    width: "45%", // Requested Change: Increased Width (was likely auto or limited before)
    shadowColor: "#2ef082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});
