import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { primaryColors, whiteColors } from "../constants/GlobalConstants";

interface CategoryPillProps {
  category: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryPill = ({ category, isSelected, onPress }: CategoryPillProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryPill;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: whiteColors,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedContainer: {
    backgroundColor: primaryColors,
    borderColor: primaryColors,
  },
  text: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  selectedText: {
    color: whiteColors,
    fontWeight: "bold",
  },
});
