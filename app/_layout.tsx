import { Stack } from "expo-router";
import { View } from "react-native";
import AppLockScreen from "../components/AppLockScreen";
import { AppLockProvider, useAppLock } from "../context/AppLockContext";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";

function AppContent() {
  const { isLocked, settingsLoading } = useAppLock();

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        {/* Splash screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Auth screens */}
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        <Stack.Screen
          name="auth/onboarding/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/onboarding"
          options={{ headerShown: false }}
        />

        {/* Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Checkout */}
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />

        <Stack.Screen
          name="profile/general"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile/privacy"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile/paymentMethods"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile/editProfile"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile/about" options={{ headerShown: false }} />
        <Stack.Screen
          name="legal/HelpCenter"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="legal/Policy" options={{ headerShown: false }} />
        <Stack.Screen name="legal/Terms" options={{ headerShown: false }} />

        <Stack.Screen
          name="help/EmailSupport"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="help/Call" options={{ headerShown: false }} />
        <Stack.Screen name="help/chat" options={{ headerShown: false }} />

        <Stack.Screen
          name="profile/newMethod"
          options={{ headerShown: false }}
        />

        {/* Product Details */}
        <Stack.Screen
          name="products/[id]"
          options={{ title: "Details", headerShown: false }}
        />
      </Stack>

      {/* App Lock Overlay — renders above everything when locked */}
      {isLocked && !settingsLoading && <AppLockScreen />}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <AppLockProvider>
            <AppContent />
          </AppLockProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

