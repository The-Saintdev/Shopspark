import privacyShield from "@/assets/images/privashield.jpg";
import ProfileHeader from "@/components/ProfileHeader";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const privacy = () => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const toggleFingerprintSwitch = () =>
    setIsFingerprintEnabled((previousState) => !previousState);

  const [isLockEnabled, setIsLockEnabled] = useState(false);
  const toggleLockSwitch = () =>
    setIsLockEnabled((previousState) => !previousState);

  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);
  const toggleMarketingSwitch = () =>
    setIsMarketingEnabled((previousState) => !previousState);

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const toggleLocationSwitch = () =>
    setIsLocationEnabled((previousState) => !previousState);

  const router = useRouter();
  const { theme } = useTheme();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? Your account will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ProfileHeader
        title="Privacy & Security"
        onpress={() => {
          router.back();
        }}
      />
      <ScrollView>
        <View style={styles.imagecon}>
          <ImageBackground source={privacyShield} style={styles.image}>
            <View style={styles.trusttext}>
              <Ionicons name="shield-checkmark" size={32} color="white" />
              <Text
                style={{ fontSize: 32, fontWeight: "bold", color: "white" }}
              >
                Your Trust is our Priority
              </Text>
            </View>
            <View style={{ width: "95%", marginBottom: -60, marginLeft: 50 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "whitesmoke",
                  marginRight: 15,
                }}
              >
                We use Industry standard encryption to protect your Shopping
                experience and Personal data.
              </Text>
            </View>
          </ImageBackground>
        </View>
        <Text style={[styles.headtext, { color: theme.text }]}>
          Support & Legal
        </Text>
        <View style={[styles.container, { backgroundColor: theme.card }]}>
          <TouchableOpacity onPress={() => router.push("/legal/HelpCenter")}>
            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="help-circle-outline" size={28} color="black" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 5,
                  color: theme.text,
                }}
              >
                Help Center
              </Text>
              <FontAwesome5
                name="chevron-right"
                size={22}
                color={theme.icon}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => router.push("/legal/Policy")}>
            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Foundation name="shield" size={28} color="black" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 5,
                  color: theme.text,
                }}
              >
                Privacy Policy
              </Text>
              <FontAwesome5
                name="chevron-right"
                size={22}
                color={theme.icon}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => router.push("/legal/Terms")}>
            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <FontAwesome name="file-text" size={22} color="black" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 5,
                  color: theme.text,
                }}
              >
                Terms of Service
              </Text>
              <FontAwesome5
                name="chevron-right"
                size={22}
                color={theme.icon}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[styles.headtext, { color: theme.text }]}>
          Permissions Manager
        </Text>
        <View style={[styles.container, { backgroundColor: theme.card }]}>
          <View style={styles.settingItem}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 3,
                  color: theme.text,
                }}
              >
                Marketing Emails
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginLeft: 3,
                  color: theme.text,
                }}
              >
                Recieve Updates on new Products and Special Offers
              </Text>
            </View>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#5ef85eff" }}
              thumbColor={isMarketingEnabled ? "#ffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleMarketingSwitch}
              value={isMarketingEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 3,
                  color: theme.text,
                }}
              >
                Location Services
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 3,
                  color: theme.text,
                }}
              >
                Allow Access for local Delivery estimates
              </Text>
            </View>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#5ef3f8ff" }}
              thumbColor={isLocationEnabled ? "#ffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLocationSwitch}
              value={isLocationEnabled}
            />
          </View>
        </View>
        <Text style={[styles.headtext, { color: theme.text }]}>
          Account Actions
        </Text>
        <View style={[styles.container, { backgroundColor: theme.card }]}>
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Entypo name="lock" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 3,
                color: theme.text,
              }}
            >
              App Lock
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#506dffff" }}
              thumbColor={isLockEnabled ? "#ffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLockSwitch}
              value={isLockEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="finger-print" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 3,
                color: theme.text,
              }}
            >
              Biometrics
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#ff9950ff" }}
              thumbColor={isFingerprintEnabled ? "#ffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleFingerprintSwitch}
              value={isFingerprintEnabled}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <MaterialIcons name="delete-sweep" size={20} color="#fa2e23ff" />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default privacy;

const styles = StyleSheet.create({
  imagecon: {
    height: 200,
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#f9d8d8ff",
    marginBottom: 20,
  },
  deleteText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
  trusttext: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  headtext: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 25,
  },
  container: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
  },
  settingItem: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 5,
  },
  separator: {
    height: 1, // Defines the thickness of the line
    width: "100%", // Makes the line span the full width
    backgroundColor: "#bab6b6ff",
    marginBottom: 5, // Sets the color (a light gray is common)
    // You can add margin here for spacing if needed
    // marginVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  switch: {
    marginLeft: "auto",
  },
});
