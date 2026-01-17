import { backgroundColors, chatBackgrounds, primaryColors } from "@/constants/GlobalConstants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={styles.avatar}
              />
              <View style={styles.onlineDot} />
            </View>
            <View>
              <Text style={styles.headerName}>Sarah from Support</Text>
              <Text style={styles.headerStatus}>Online now</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Date */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Today 9:41 AM</Text>
          </View>

          {/* Received Message */}
          <View style={styles.receivedMessage}>
            <Text style={styles.messageText}>
              Hi there! 👋 How can I help you with your order today?
            </Text>
          </View>

          {/* User Avatar (Left side of next received sequence in image, but standard is left for received, right for sent. Image shows avatar on left for received. I will follow standard chat UI but mimic image placement) */}
          {/* Actually image shows avatar for received messages. I'll add it for the first block if needed, but the image has it for the subsequent blocks. The first block seems to be the start. */}

          {/* Chips */}
          <View style={styles.chipsContainer}>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Where is my order?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Return Policy</Text>
            </TouchableOpacity>
          </View>

          {/* Sent Message */}
          <View style={styles.sentMessageContainer}>
            {/* No avatar for sent usually */}
            <View style={styles.sentMessage}>
              <Text style={styles.sentMessageText}>
                I need to check the status of order #4590.
              </Text>
            </View>
            <Text style={styles.timeText}>9:43 AM</Text>
          </View>

          {/* Received Message Sequence */}
          <View style={styles.receivedBlock}>
            {/* Avatar */}
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.smallAvatar}
            />
            <View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  Checking that for you now... Here are the details for your
                  recent order.
                </Text>
              </View>

              {/* Order Card */}
              <View style={styles.orderCard}>
                <View style={styles.orderIcon}>
                  <MaterialCommunityIcons
                    name="headphones"
                    size={24}
                    color="#fff"
                  />
                </View>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderStatus}>IN TRANSIT</Text>
                  <Text style={styles.orderName}>Sony WH-1000XM5</Text>
                  <Text style={styles.orderDetail}>
                    Arriving by tomorrow, 6 PM
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.justNowText}>Just now</Text>
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.plusButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#c3bebeff"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: chatBackgrounds, // Dark background like image
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#193967f0",
    marginHorizontal: 16,
    marginTop: 10,
    padding: 12,
    borderRadius: 30, // Rounded header
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#21a353", // Green online dot
    borderWidth: 2,
    borderColor: "#1F2937",
  },
  headerName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerStatus: {
    color: "#9CA3AF", // Grayish text
    fontSize: 12,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  dateContainer: {
    alignSelf: "center",
    backgroundColor: "#1F2937",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  receivedMessage: {
    backgroundColor: "#193967f0",
    padding: 16,
    borderRadius: 20,
    borderTopLeftRadius: 4, // Chat bubble effect
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginBottom: 16,
  },
  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },
  chipsContainer: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 24,
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipText: {
    // color: "#60A5FA", // Keep blue for links? User said typical blue in image. User said "dont use the blue in the image... use my colors".
    // Let's switch to Green or White.
    // User said "use my colors tho dont use the blue in the image".
    // I will use his green #21a353 for the text or border?
    // Let's use the green for the text to indicate action.
    color: "#21a353",
    fontSize: 14,
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    marginBottom: 24,
    maxWidth: "80%",
  },
  sentMessage: {
    backgroundColor: "#21a353", // User's green
    padding: 16,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    marginBottom: 4,
  },
  sentMessageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },
  timeText: {
    color: "#9CA3AF",
    fontSize: 11,
  },
  receivedBlock: {
    flexDirection: "row",
    marginBottom: 8,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: "flex-end", // Align at bottom of block
    marginBottom: 20, // push up a bit
  },
  orderCard: {
    backgroundColor: "#1F2937",
    padding: 12,
    borderRadius: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    width: 260,
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderStatus: {
    // color: "#3B82F6", // Blue typical for "In Transit". Should I change to Green?
    // "use my colors tho dont use the blue in the image"
    // Okay, turning to Green implies completed? Or maybe just accent.
    // I will use a lighter green or standard "info" color if green is too much.
    // Let's stick to the user's request: "dont use the blue".
    color: "#21a353",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  orderName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  orderDetail: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  justNowText: {
    color: "#9CA3AF",
    fontSize: 11,
    marginLeft: 40 + 16, // avatar width + margins
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#111827", // match bg
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#193967f0", // Card bg
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#243c5eff",
    borderRadius: 22,
    paddingHorizontal: 16,
    color: "#fff",
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#06d053ff", // Green btn
    justifyContent: "center",
    alignItems: "center",
  },
});
