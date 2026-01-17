import { backgroundColors, primaryColors } from "@/constants/GlobalConstants";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PasswordModalContentProps {
  onCancel: () => void;
}

export default function PasswordModalContent({
  onCancel,
}: PasswordModalContentProps) {
  const [password, setPassword] = useState("");

  const updatePassword = async () => {
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    // Simulate API call
    Alert.alert("Success", "Password updated successfully!");
    setPassword("");
    onCancel();
  };

  return (
    <View>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>
        Secure Your Account with a Strong Password
      </Text>

      <View style={styles.liner} />

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter your current password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={updatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.canbutton} onPress={onCancel}>
        <Text style={styles.canbuttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  liner: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: primaryColors,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    color: "black",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: primaryColors,
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  canbutton: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    backgroundColor: backgroundColors,
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
    borderColor: primaryColors,
    borderWidth: 1,
  },
  canbuttonText: {
    color: primaryColors,
    fontSize: 20,
    fontWeight: "bold",
  },
});
