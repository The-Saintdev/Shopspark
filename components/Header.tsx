import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import img from "@/assets/images/Slide1.jpg";

interface Header {
  name: string;
  // age?: number;
}

const Header = () => {
  return (
    <View>
      <Image source={img} style={styles.image} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: "50%",
  },
});
