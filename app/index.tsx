import { Text, View, Image, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {  useRouter} from "expo-router";
import { useEffect, useRef } from "react";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {

  const router = useRouter();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {

    Animated.parallel([

      Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 20,
      friction: 8,
      useNativeDriver: true,
    }),
    Animated.timing(logoFadeAnim, {
      toValue: 1,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/auth/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
    
  
  return (
    <LinearGradient
      colors={["#3bf6aee3", "#33f7acff", "#05e891e0"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoFadeAnim,
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoicon}>SS</Text>
          </View>

          <Text style={styles.appname}>ShopSpark</Text>

          <Text style={styles.tagline}>Shoping E-Commerce Platform</Text>
        </Animated.View>

        <Animated.View style={[styles.loadingContainer, {opacity: fadeAnim}]}>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]}/>
            <View style={[styles.dot, styles.dot2]}/>
            <View style={[styles.dot, styles.dot3]}/>
          </View>
        </Animated.View>

      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#00ff95ff",
    borderWidth: 2,
    borderColor: "#494545be",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  logoicon: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#05e891e0",
  },
  appname: {
    fontSize: 36,
    fontWeight: "800",
    color: "#10e1f4ff",
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 17,
    color: "#ffffffef",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  loadingContainer: {
    marginTop: 40,
  },
  loadingDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffffdd",
    marginHorizontal: 7,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
});