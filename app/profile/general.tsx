import PasswordModalContent from "@/app/modals/PasswordModalContent";
import ThemeModalContent from "@/app/modals/ThemeModalContent";
import CustomModal from "@/components/CustomModal";
import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const general = () => {
  const [activeModal, setActiveModal] = useState<"theme" | "password" | null>(
    null
  );
  const { theme } = useTheme();

  const router = useRouter();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const toggleNotificationSwitch = () =>
    setIsNotificationsEnabled((previousState) => !previousState);
  const [isLockEnabled, setIsLockEnabled] = useState(false);
  const toggleLockSwitch = () =>
    setIsLockEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ProfileHeader
        title="General Settings"
        onpress={() => {
          router.back();
        }}
      />
      <View style={[styles.container, { backgroundColor: theme.card }]}>
        <Text style={[styles.headtext, { color: theme.text }]}>Settings</Text>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => setActiveModal("password")}>
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="lock" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: theme.text,
              }}
            >
              Change Password
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
        <TouchableOpacity onPress={() => setActiveModal("theme")}>
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="dark-mode" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: theme.text,
              }}
            >
              Theme
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginLeft: 155,
                color: "grey",
              }}
            >
              System
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
        <View style={styles.settingItem}>
          <View style={styles.iconContainer}>
            <Octicons name="bell" size={24} color="black" />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              color: theme.text,
            }}
          >
            Notifications
          </Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#3194a5ff", true: "#e2ff78ff" }} // Colors for the track (optional)
            thumbColor={isNotificationsEnabled ? "#e2ff78ff" : "#37769eff"} // Color for the thumb (optional)
            ios_backgroundColor="#3e3e3e" // Background color for iOS (optional)
            onValueChange={toggleNotificationSwitch} // The function to call when the user toggles
            value={isNotificationsEnabled} // The current state of the switch
          />
        </View>

        <View style={styles.separator} />
        <TouchableOpacity onPress={() => router.push("/profile/about")}>
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="exclamation-circle" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: theme.text,
              }}
            >
              About
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
        <TouchableOpacity>
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="map-marker" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: theme.text,
              }}
            >
              Shipping Addresses
            </Text>
            <FontAwesome5
              name="chevron-right"
              size={22}
              color={theme.icon}
              style={{ marginLeft: "auto" }}
            />
          </View>
        </TouchableOpacity>
        <CustomModal
          visible={activeModal !== null}
          onClose={() => setActiveModal(null)}
        >
          {activeModal === "theme" && (
            <ThemeModalContent onCancel={() => setActiveModal(null)} />
          )}
          {activeModal === "password" && (
            <PasswordModalContent onCancel={() => setActiveModal(null)} />
          )}
        </CustomModal>
      </View>
    </SafeAreaView>
  );
};

export default general;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
  },
  headtext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  separator: {
    height: 1, // Defines the thickness of the line
    width: "100%", // Makes the line span the full width
    backgroundColor: "#706f6fff",
    marginBottom: 5, // Sets the color (a light gray is common)
    // You can add margin here for spacing if needed
    // marginVertical: 8,
  },
  settingItem: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 5,
  },
  switch: {
    marginLeft: "auto",
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
});
