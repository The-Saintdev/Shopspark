import { useTheme } from "@/context/ThemeContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  title: string;
  onpress: () => void;
}

const ProfileHeader = ({ title, onpress }: ProfileHeaderProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onpress}>
        <EvilIcons name="arrow-left" size={45} color={theme.icon} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <TouchableOpacity onPress={() => {}} style={{ opacity: 0 }}>
        <Text style={{ color: "transparent" }}>Saveer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
