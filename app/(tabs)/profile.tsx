import ProfileOption from "@/components/ProfileOption";
import { backgroundColors, primaryColors } from "@/constants/GlobalConstants";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
;

const Profile = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { profile, signOut, refreshProfile } = useAuth();

  // Refresh profile when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshProfile();
    }, [])
  );

  // Get full name from profile
  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "User";
  const email = profile?.email || "user@example.com";

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View
          entering={FadeInDown.springify()}
          style={[styles.header, { backgroundColor: theme.card }]}
        >
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: profile?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{fullName}</Text>
          <Text style={styles.email}>{email}</Text>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={[styles.statsContainer, { backgroundColor: theme.card }]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          {/* <View style={styles.divider} /> */}
          {/* <View style={styles.statItem}>
            <Text style={styles.statNumber}>$1.2k</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View> */}
        </Animated.View>

        {/* Options Section */}
        <View style={styles.optionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Account
          </Text>
          <ProfileOption
            icon="person"
            title="Edit Profile"
            onPress={() => {
              router.push("/profile/editProfile");
            }}
            delay={200}
          />
          {/* <ProfileOption
            icon="map-marker-outline"
            title="Saved Addresses"
            onPress={() => {}}
            delay={300}
          /> */}
          <ProfileOption
            icon="credit-card"
            title="Payment Methods"
            onPress={() => {
              router.push("/profile/paymentMethods");
            }}
            delay={400}
          />

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Settings
          </Text>
          <ProfileOption
            icon="settings"
            title="General"
            onPress={() => {
              router.push("/profile/general");
            }}
            delay={500}
          />
          <ProfileOption
            icon="shield"
            title="Privacy & Security"
            onPress={() => {
              router.push("/profile/privacy");
            }}
            delay={600}
          />

          <Animated.View entering={FadeInDown.delay(700)}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color="#fa2e23ff"
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColors,
    paddingBottom: 70,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "white",
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#f0f5ff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: primaryColors,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#888",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 0,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: primaryColors,
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#eee",
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 4,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#f9d8d8ff",
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
});
