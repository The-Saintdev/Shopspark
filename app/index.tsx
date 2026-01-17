import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

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
        duration: 3000,
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
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#a9ffdee3", "#b2fde0ff", "#8df5cde0"]}
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
            <Text style={styles.logoicon1}>S</Text>
            <Text style={styles.logoicon2}>S</Text>
          </View>

          <Text style={styles.appname}>ShopSpark</Text>

          <Text style={styles.tagline}>Shoping Redefined</Text>
        </Animated.View>

        <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
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
    width: 150,
    height: 150,
    borderRadius: 90,
    backgroundColor: "#d3fdebff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 25,
    shadowColor: "#00ff95",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 30,
  },
  logoicon1: {
    fontSize: 85,
    fontWeight: "bold",
    color: "#01b11cff",
    marginRight: -10,
    marginBottom: 15,
  },
  logoicon2: {
    fontSize: 85,
    marginTop: 25,
    fontWeight: "bold",
    color: "#06f79aff",
    marginLeft: -5,
  },
  appname: {
    fontSize: 45,
    fontWeight: "800",
    color: "Black",
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 19,
    color: "#00b203ef",
    letterSpacing: 2,
    marginTop: 10,
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
