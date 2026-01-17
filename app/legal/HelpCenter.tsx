import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpCenter = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ProfileHeader
        title="Help Center"
        onpress={() => {
          router.back();
        }}
      />

      <View>
        <Text style={[styles.headtext, { color: theme.text }]}>
          How can we Help?
        </Text>
        <Text style={[styles.subheadtext, { color: theme.text }]}>
          Search for help with your orders or account
        </Text>

        <View style={styles.searchbox}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            placeholder="Search for Topics or Questions......"
            placeholderTextColor="grey"
            style={styles.searchinput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.helptextcon}>
          <Text style={[styles.helptext, { color: theme.text }]}>
            Still need Help?
          </Text>
          <View style={[styles.helpbox, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={() => router.push("/help/chat")}>
              <View style={styles.settingItem}>
                <Ionicons name="chatbox-ellipses" size={28} color="#01f205ff" />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 10,
                      color: theme.text,
                    }}
                  >
                    Live Chat
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      marginLeft: 10,
                      fontSize: 15,
                      marginTop: 5,
                    }}
                  >
                    Wait time - 1min
                  </Text>
                </View>
                <FontAwesome5
                  name="chevron-right"
                  size={22}
                  color="grey"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => router.push("/help/EmailSupport")}>
              <View style={styles.settingItem}>
                <MaterialIcons
                  name="mark-email-read"
                  size={28}
                  color="#01f205ff"
                />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 10,
                      color: theme.text,
                    }}
                  >
                    Email Support
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      marginLeft: 10,
                      fontSize: 15,
                      marginTop: 5,
                    }}
                  >
                    Response within 24hrs
                  </Text>
                </View>
                <FontAwesome5
                  name="chevron-right"
                  size={22}
                  color="grey"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => router.push("/help/Call")}>
              <View style={styles.settingItem}>
                <MaterialIcons
                  name="wifi-calling-3"
                  size={28}
                  color="#01f205ff"
                />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 10,
                      color: theme.text,
                    }}
                  >
                    Call Us
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      marginLeft: 10,
                      fontSize: 15,
                      marginTop: 5,
                    }}
                  >
                    Mon-Fri, 9am-6pm
                  </Text>
                </View>
                <FontAwesome5
                  name="chevron-right"
                  size={22}
                  color="grey"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  headtext: {
    fontSize: 28,
    fontWeight: "bold",
    color: "theme.text",
    marginLeft: 20,
    marginTop: 10,
  },
  subheadtext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "theme.text",
    marginLeft: 20,
    marginTop: 8,
  },
  searchbox: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 35,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    gap: 8,
  },
  separator: {
    height: 1, // Defines the thickness of the line
    width: "100%", // Makes the line span the full width
    backgroundColor: "#bab6b6ff",
    marginBottom: 5, // Sets the color (a light gray is common)
    // You can add margin here for spacing if needed
    // marginVertical: 8,
  },
  searchinput: {
    flex: 1,
    fontSize: 18,
    color: "black",
  },
  helptextcon: {
    marginTop: 235,
  },
  helptext: {
    fontSize: 21,
    fontWeight: "bold",
    color: "theme.text",
    marginLeft: 14,
    marginTop: 8,
  },
  helpbox: {
    width: "95%",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 15,
  },
  settingItem: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 5,
  },
});
