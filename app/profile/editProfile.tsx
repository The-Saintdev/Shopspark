import ProfileHeader from "@/components/ProfileHeader";
import { backgroundColors, primaryColors } from "@/constants/GlobalConstants";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const editProfile = () => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyboardView, { backgroundColor: theme.background }]}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <ProfileHeader
          title="Edit Profile"
          onpress={() => {
            router.back();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon}>
                <MaterialCommunityIcons name="pencil" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <TextInput
              placeholder="Enter your Phone No"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={phoneNo}
              onChangeText={setPhoneNo}
              keyboardType="number-pad"
            />
          </View>

          <View>
            <TextInput
              placeholder="Enter your Address"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View>
            <TextInput
              placeholder="Enter your Country of residence"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={country}
              onChangeText={setCountry}
            />
          </View>

          <View>
            <TextInput
              placeholder="Enter your state of residence"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={state}
              onChangeText={setState}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Sex</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSex("Male")}
              >
                <MaterialCommunityIcons
                  name={
                    sex === "Male"
                      ? "checkbox-marked-circle"
                      : "checkbox-blank-circle-outline"
                  }
                  size={24}
                  color={primaryColors}
                />
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSex("Female")}
              >
                <MaterialCommunityIcons
                  name={
                    sex === "Female"
                      ? "checkbox-marked-circle"
                      : "checkbox-blank-circle-outline"
                  }
                  size={24}
                  color={primaryColors}
                />
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSex("Others")}
              >
                <MaterialCommunityIcons
                  name={
                    sex === "Others"
                      ? "checkbox-marked-circle"
                      : "checkbox-blank-circle-outline"
                  }
                  size={24}
                  color={primaryColors}
                />
                <Text style={[styles.radioText, { color: theme.text }]}>
                  Others
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default editProfile;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 5,
    marginTop: 0,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.05,
    // shadowRadius: 5,
    // elevation: 5,
  },
  input: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#d6d8ddff",
    borderRadius: 15,
    padding: 10,
    height: 58,
    fontSize: 17,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
    fontWeight: "500",
    marginLeft: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 0,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#d6d8ddff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: primaryColors,
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  saveButton: {
    width: "95%",
    backgroundColor: primaryColors,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  keyboardView: {
    flex: 1,
    backgroundColor: backgroundColors,
  },
});
