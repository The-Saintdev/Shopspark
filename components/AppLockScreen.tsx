import { primaryColors } from "@/constants/GlobalConstants";
import { useAppLock } from "@/context/AppLockContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    FadeIn,
    FadeInUp,
    ZoomIn,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function AppLockScreen() {
    const { unlockApp, biometricLabel } = useAppLock();

    const biometricIcon =
        Platform.OS === "ios" ? "face-recognition" : "fingerprint";

    return (
        <View style={styles.overlay}>
            <BlurView intensity={95} tint="dark" style={styles.blurContainer}>
                <Animated.View
                    entering={ZoomIn.springify().damping(15)}
                    style={styles.content}
                >
                    {/* Logo */}
                    <Animated.View
                        entering={FadeIn.delay(200).duration(600)}
                        style={styles.logoContainer}
                    >
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoIcon1}>S</Text>
                            <Text style={styles.logoIcon2}>S</Text>
                        </View>
                    </Animated.View>

                    {/* Lock Icon */}
                    <Animated.View
                        entering={FadeInUp.delay(400).springify()}
                        style={styles.lockIconContainer}
                    >
                        <View style={styles.lockCircle}>
                            <Ionicons name="lock-closed" size={36} color="white" />
                        </View>
                    </Animated.View>

                    {/* Title */}
                    <Animated.Text
                        entering={FadeInUp.delay(500).springify()}
                        style={styles.title}
                    >
                        App Locked
                    </Animated.Text>

                    <Animated.Text
                        entering={FadeInUp.delay(600).springify()}
                        style={styles.subtitle}
                    >
                        Authenticate to access ShopSpark
                    </Animated.Text>

                    {/* Unlock Button */}
                    <Animated.View entering={FadeInUp.delay(700).springify()}>
                        <TouchableOpacity
                            style={styles.unlockButton}
                            onPress={unlockApp}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons
                                name={biometricIcon}
                                size={28}
                                color="white"
                            />
                            <Text style={styles.unlockText}>
                                Unlock with {biometricLabel}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Tap hint */}
                    <Animated.Text
                        entering={FadeIn.delay(1000).duration(800)}
                        style={styles.hintText}
                    >
                        Tap the button above to authenticate
                    </Animated.Text>
                </Animated.View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
        elevation: 9999,
    },
    blurContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        alignItems: "center",
        paddingHorizontal: 40,
    },
    logoContainer: {
        marginBottom: 30,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(211, 253, 235, 0.15)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "rgba(1, 199, 123, 0.3)",
    },
    logoIcon1: {
        fontSize: 55,
        fontWeight: "bold",
        color: "#01b11cff",
        marginRight: -6,
        marginBottom: 10,
    },
    logoIcon2: {
        fontSize: 55,
        marginTop: 15,
        fontWeight: "bold",
        color: "#06f79a",
        marginLeft: -3,
    },
    lockIconContainer: {
        marginBottom: 20,
    },
    lockCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: primaryColors,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: primaryColors,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "white",
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
        marginBottom: 40,
        textAlign: "center",
    },
    unlockButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: primaryColors,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        gap: 12,
        shadowColor: primaryColors,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    unlockText: {
        fontSize: 18,
        fontWeight: "700",
        color: "white",
    },
    hintText: {
        marginTop: 24,
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.45)",
        textAlign: "center",
    },
});
