import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const newMethod = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const limit = 4; // Set your desired limit here

  const [cardType, setCardType] = useState("Visa");
  const [saveCard, setSaveCard] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ProfileHeader title="Add New Card" onpress={() => router.back()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Card Type Selection */}
          <Text style={[styles.label, { color: theme.text, marginTop: 0 }]}>
            Card Type
          </Text>
          <View style={styles.cardTypeContainer}>
            {["Visa", "Mastercard", "Verve"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.cardTypeBtn,
                  cardType === type && styles.activeCardTypeBtn,
                ]}
                onPress={() => setCardType(type)}
              >
                <Text
                  style={[
                    styles.cardTypeText,
                    cardType === type && styles.activeCardTypeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Card Number */}
          <Text style={[styles.label, { color: theme.text }]}>Card Number</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Cardholder Name */}
          <Text style={[styles.label, { color: theme.text }]}>
            Cardholder Name
          </Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#999"
            />
          </View>

          {/* Expiry & CVV Row */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 15 }}>
              <Text style={[styles.label, { color: theme.text }]}>
                Expiry Date
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    { textAlign: "center", paddingLeft: 0 },
                  ]}
                  placeholder="MM/YY"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={[
                    styles.label,
                    { marginBottom: 0, marginTop: 16 },
                    { color: theme.text },
                  ]}
                >
                  CVV
                </Text>
                <MaterialCommunityIcons
                  name="help-circle"
                  size={16}
                  color="#999"
                  style={{ marginLeft: 5, marginTop: 16 }}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    { textAlign: "center", paddingLeft: 0 },
                  ]}
                  placeholder="123"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={limit}
                  secureTextEntry
                />
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={16}
                  color="#999"
                  style={{ position: "absolute", right: 15 }}
                />
              </View>
            </View>
          </View>

          {/* Save Card Switch */}
          <View style={styles.saveContainer}>
            <View>
              <Text style={[styles.saveTitle, { color: theme.text }]}>
                Save this card
              </Text>
              <Text style={styles.saveSubtitle}>
                Securely for future purchases
              </Text>
            </View>
            <Switch
              value={saveCard}
              onValueChange={setSaveCard}
              trackColor={{ false: "#767577", true: "#2ef082" }}
              thumbColor={"white"}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default newMethod;

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "800",
  },
  cardTypeContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTypeBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },
  activeCardTypeBtn: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#2ef082",
  },
  cardTypeText: {
    color: "#999",
    fontWeight: "500",
  },
  activeCardTypeText: {
    color: "black",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  saveTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  saveSubtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  footer: {
    gap: 20,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#2ef082",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#2ef082",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelBtn: {
    alignItems: "center",
    padding: 10,
  },
  cancelText: {
    color: "#999",
    fontSize: 16,
  },
});
