import ProfileHeader from "@/components/ProfileHeader";
import { backgroundColors, primaryColors, whiteColors } from "@/constants/GlobalConstants";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

const EditProfile = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { profile, refreshProfile } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState<"Male" | "Female" | "Others" | "">("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // Pre-fill form with current profile data
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setSex((profile.sex as "Male" | "Female" | "Others") || "");
      setPhoneNo(profile.phone_number || "");
      setAddress(profile.address || "");
      setCountry(profile.country || "");
      setState(profile.state || "");
      setImage(profile.avatar_url || null);
    }
  }, [profile]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const uploadImage = async (uri: string, userId: string): Promise<string | null> => {
    try {
      const arrayBuffer = await fetch(uri).then((res) => res.arrayBuffer());
      const fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, arrayBuffer, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Error", "First name and last name are required");
      return;
    }

    if (!profile?.id) {
      Alert.alert("Error", "User not found. Please login again.");
      return;
    }

    setLoading(true);
    try {
      let avatarUrl = profile.avatar_url;

      // Upload new image if selected and different from current
      if (image && image !== profile.avatar_url && !image.startsWith("http")) {
        const uploadedUrl = await uploadImage(image, profile.id);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        } else {
          Alert.alert("Warning", "Failed to upload image. Profile will be saved without new image.");
        }
      }

      const { error } = await supabase
        .from("profile")
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          sex: sex || null,
          phone_number: phoneNo.trim() || null,
          address: address.trim() || null,
          country: country.trim() || null,
          state: state.trim() || null,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      // Refresh the profile data in context
      await refreshProfile();

      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={{
                    uri: image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
                  }}
                  style={styles.profileImage}
                />
                <View style={styles.editIcon}>
                  <MaterialCommunityIcons name="pencil" size={16} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* First Name */}
          <View>
            <Text style={[styles.inputLabel, { color: theme.text }]}>First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>

          {/* Last Name */}
          <View>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              placeholderTextColor="#999"
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          {/* Phone Number */}
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

          {/* Address */}
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

          {/* Country */}
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

          {/* State */}
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

          {/* Sex Selection */}
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

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSaveChanges}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={whiteColors} />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 5,
    marginTop: 0,
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
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
    marginBottom: 8,
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
    marginBottom: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  saveButtonDisabled: {
    opacity: 0.7,
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
