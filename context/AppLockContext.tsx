import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Alert, AppState, AppStateStatus, Platform } from "react-native";

// ── Storage keys ──────────────────────────────────────────────────────
const STORAGE_KEYS = {
    APP_LOCK_ENABLED: "@shopspark_app_lock_enabled",
    BIOMETRICS_ENABLED: "@shopspark_biometrics_enabled",
};

// ── Context type ──────────────────────────────────────────────────────
interface AppLockContextType {
    /** Whether the user has turned on app lock */
    appLockEnabled: boolean;
    /** Whether biometrics are turned on */
    biometricsEnabled: boolean;
    /** Whether the app is currently locked (overlay shown) */
    isLocked: boolean;
    /** Toggle app lock on/off */
    toggleAppLock: () => Promise<void>;
    /** Toggle biometrics on/off */
    toggleBiometrics: () => Promise<void>;
    /** Manually trigger biometric prompt to unlock */
    unlockApp: () => Promise<void>;
    /** Friendly name for the biometric type available on this device */
    biometricLabel: string;
    /** True while we are reading persisted settings on mount */
    settingsLoading: boolean;
}

const AppLockContext = createContext<AppLockContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────
interface AppLockProviderProps {
    children: ReactNode;
}

export function AppLockProvider({ children }: AppLockProviderProps) {
    const [appLockEnabled, setAppLockEnabled] = useState(false);
    const [biometricsEnabled, setBiometricsEnabled] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [biometricLabel, setBiometricLabel] = useState(
        Platform.OS === "ios" ? "Face ID" : "Fingerprint"
    );
    const [settingsLoading, setSettingsLoading] = useState(true);

    // Track whether app has been backgrounded at least once
    const hasBeenBackgrounded = useRef(false);
    const appState = useRef(AppState.currentState);

    // ── Detect available biometric type ───────────────────────────────
    const detectBiometricType = useCallback(async () => {
        try {
            const types =
                await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (
                types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
            ) {
                setBiometricLabel(Platform.OS === "ios" ? "Face ID" : "Face Unlock");
            } else if (
                types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
            ) {
                setBiometricLabel("Fingerprint");
            } else if (
                types.includes(LocalAuthentication.AuthenticationType.IRIS)
            ) {
                setBiometricLabel("Iris");
            }
        } catch {
            // Fallback already set
        }
    }, []);

    // ── Load persisted settings ───────────────────────────────────────
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const [lockVal, bioVal] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEYS.APP_LOCK_ENABLED),
                    AsyncStorage.getItem(STORAGE_KEYS.BIOMETRICS_ENABLED),
                ]);
                const lockEnabled = lockVal === "true";
                const bioEnabled = bioVal === "true";
                setAppLockEnabled(lockEnabled);
                setBiometricsEnabled(bioEnabled);

                // If app lock is enabled, lock the app immediately on startup
                if (lockEnabled && bioEnabled) {
                    setIsLocked(true);
                }
            } catch (error) {
                console.error("Error loading app lock settings:", error);
            } finally {
                setSettingsLoading(false);
            }
        };

        loadSettings();
        detectBiometricType();
    }, [detectBiometricType]);

    // ── Auto-prompt biometrics when locked ────────────────────────────
    useEffect(() => {
        if (isLocked && biometricsEnabled) {
            // Small delay to ensure the lock screen is rendered first
            const timeout = setTimeout(() => {
                authenticateWithBiometrics();
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [isLocked, biometricsEnabled]);

    // ── AppState listener (foreground / background) ───────────────────
    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState: AppStateStatus) => {
                // Track backgrounding
                if (nextAppState === "background" || nextAppState === "inactive") {
                    hasBeenBackgrounded.current = true;
                }

                // Lock when coming back to foreground
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === "active" &&
                    hasBeenBackgrounded.current &&
                    appLockEnabled
                ) {
                    setIsLocked(true);
                }

                appState.current = nextAppState;
            }
        );

        return () => subscription.remove();
    }, [appLockEnabled]);

    // ── Biometric authentication ──────────────────────────────────────
    const authenticateWithBiometrics = async (): Promise<boolean> => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: `Unlock ShopSpark with ${biometricLabel}`,
                cancelLabel: "Cancel",
                disableDeviceFallback: false,
                fallbackLabel: "Use Passcode",
            });

            if (result.success) {
                setIsLocked(false);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Biometric authentication error:", error);
            return false;
        }
    };

    // ── Check biometric hardware ──────────────────────────────────────
    const checkBiometricAvailability = async (): Promise<boolean> => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert(
                "Not Available",
                "Your device does not support biometric authentication.",
                [{ text: "OK" }]
            );
            return false;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert(
                "No Biometrics Enrolled",
                `Please set up ${biometricLabel} in your device settings first.`,
                [{ text: "OK" }]
            );
            return false;
        }

        return true;
    };

    // ── Toggle app lock ───────────────────────────────────────────────
    const toggleAppLock = async () => {
        const newValue = !appLockEnabled;

        if (newValue) {
            // When enabling app lock, check if biometrics are available and auto-enable
            const available = await checkBiometricAvailability();
            if (available) {
                // Verify with a biometric prompt first
                const authenticated = await authenticateWithBiometrics();
                if (!authenticated) {
                    Alert.alert(
                        "Authentication Required",
                        "You must authenticate to enable App Lock."
                    );
                    return;
                }
                // Enable both app lock and biometrics
                setAppLockEnabled(true);
                setBiometricsEnabled(true);
                await Promise.all([
                    AsyncStorage.setItem(STORAGE_KEYS.APP_LOCK_ENABLED, "true"),
                    AsyncStorage.setItem(STORAGE_KEYS.BIOMETRICS_ENABLED, "true"),
                ]);
            } else {
                return; // Don't enable if no biometrics available
            }
        } else {
            // Disabling app lock — also disable biometrics
            setAppLockEnabled(false);
            setBiometricsEnabled(false);
            setIsLocked(false);
            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.APP_LOCK_ENABLED, "false"),
                AsyncStorage.setItem(STORAGE_KEYS.BIOMETRICS_ENABLED, "false"),
            ]);
        }
    };

    // ── Toggle biometrics ─────────────────────────────────────────────
    const toggleBiometrics = async () => {
        const newValue = !biometricsEnabled;

        if (newValue) {
            const available = await checkBiometricAvailability();
            if (!available) return;

            // Verify identity before enabling
            const authenticated = await authenticateWithBiometrics();
            if (!authenticated) {
                Alert.alert(
                    "Authentication Required",
                    `You must authenticate with ${biometricLabel} to enable this feature.`
                );
                return;
            }

            setBiometricsEnabled(true);
            await AsyncStorage.setItem(STORAGE_KEYS.BIOMETRICS_ENABLED, "true");
        } else {
            setBiometricsEnabled(false);
            await AsyncStorage.setItem(STORAGE_KEYS.BIOMETRICS_ENABLED, "false");
        }
    };

    // ── Manual unlock ─────────────────────────────────────────────────
    const unlockApp = async () => {
        if (biometricsEnabled) {
            await authenticateWithBiometrics();
        } else {
            // If biometrics disabled but app lock on, just unlock
            setIsLocked(false);
        }
    };

    return (
        <AppLockContext.Provider
            value={{
                appLockEnabled,
                biometricsEnabled,
                isLocked,
                toggleAppLock,
                toggleBiometrics,
                unlockApp,
                biometricLabel,
                settingsLoading,
            }}
        >
            {children}
        </AppLockContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────────────
export function useAppLock() {
    const context = useContext(AppLockContext);
    if (context === undefined) {
        throw new Error("useAppLock must be used within an AppLockProvider");
    }
    return context;
}
