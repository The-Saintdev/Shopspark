import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import {MaterialIcons,} from "@expo/vector-icons";

export default function AccordionItem({
  title,
  icon,
  isOpen,
  onPress,
  children,
}) {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable onPress={onPress} style={styles.header}>
        <View style={styles.left}>
          <View style={styles.iconWrapper}>{icon}</View>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Rotating Arrow */}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Text style={styles.arrow}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#01f205ff" />
          </Text>
        </Animated.View>
      </Pressable>

      {/* Content */}
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#d5d1d1ff",
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2fcd7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 14,
    color: "#888",
    marginRight: 20,
  },
  content: {
    paddingBottom: 16,
    paddingLeft: 44,
  },
});
