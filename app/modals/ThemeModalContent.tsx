import { useTheme } from "@/context/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ThemeModalContentProps {
  onCancel: () => void;
}

export default function ThemeModalContent({
  onCancel,
}: ThemeModalContentProps) {
  const { themeName, switchTheme } = useTheme();

  return (
    <View>
      <Text style={styles.title}>Select Theme</Text>

      <Pressable style={styles.option} onPress={() => switchTheme("light")}>
        <Text style={styles.optionText}>Light</Text>
        {themeName === "light" && <Text style={styles.check}>✓</Text>}
      </Pressable>

      <View style={styles.separator} />

      <Pressable style={styles.option} onPress={() => switchTheme("dark")}>
        <Text style={styles.optionText}>Dark</Text>
        {themeName === "dark" && <Text style={styles.check}>✓</Text>}
      </Pressable>

      <View style={styles.separator} />

      <Pressable style={styles.option} onPress={() => switchTheme("dark")}>
        <Text style={styles.optionText}>System</Text>
        {themeName === "dark" && <Text style={styles.check}>✓</Text>}
      </Pressable>

      <Pressable style={styles.cancelLink} onPress={onCancel}>
        <Text style={styles.cancelLinkText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
  },
  check: {
    color: "#4bf2f5", // Example brand color
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  cancelLink: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
  cancelLinkText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});
