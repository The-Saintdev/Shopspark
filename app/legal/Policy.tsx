import privacyShield from "@/assets/images/privashield.jpg";
import AccordionItem from "@/components/AccordionItem";
import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  Fontisto,
  Feather
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Policy = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setOpenId(null)}>
        <View style={{ flex: 1 }}>
          <ProfileHeader
            title="Privacy Policy"
            onpress={() => {
              router.back();
            }}
          />
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.imagecon}>
              <ImageBackground source={privacyShield} style={styles.image}>
                <View style={styles.trusttext}>
                  <MaterialCommunityIcons
                    name="shield-search"
                    size={32}
                    color="white"
                  />
                  <Text
                    style={{ fontSize: 28, fontWeight: "bold", color: "white" }}
                  >
                    Data Protection
                  </Text>
                </View>
                <View style={{ width: "95%", marginBottom: 0, marginLeft: 50 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "whitesmoke",
                    }}
                  >
                    Read about how we collect,use and Share your personal
                    {"\n"}
                    data securely.
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <Text style={styles.extext}>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </Text>

            <View style={styles.policysec}>
              <Text style={[styles.policytext, { color: theme.text }]}>
                Policy Sections
              </Text>
              <View style={styles.policylist}>
                <View style={{ flex: 1 }}>
                  <AccordionItem
                    title="1. Information we Collect"
                    icon={
                      <MaterialIcons
                        name="window"
                        size={24}
                        color="#03e706ff"
                      />
                    }
                    isOpen={openId === "theme"}
                    onPress={() => handleToggle("theme")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      We collect information you provide directly when you use
                      the app, such as your name, email address, account
                      credentials, and any information you submit through forms
                      or settings. We may also automatically collect certain
                      technical information, including device type, operating
                      system, app version, IP address, and usage data such as
                      pages visited or actions taken within the app. This
                      information helps us understand how the app is used and
                      allows us to improve performance, stability, and user
                      experience.
                    </Text>
                  </AccordionItem>

                  <AccordionItem
                    title="2. How we use your data"
                    icon={
                      <FontAwesome5
                        name="user-cog"
                        size={24}
                        color="#03e706ff"
                      />
                    }
                    isOpen={openId === "using"}
                    onPress={() => handleToggle("using")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      We use your data to provide and maintain our services,
                      personalize your experience, process transactions, and
                      communicate with you about updates, security alerts, or
                      support requests. Usage data helps us analyze trends, fix
                      bugs, and develop new features. We do not use your
                      personal data for purposes unrelated to the core
                      functionality of the app without your consent.
                    </Text>
                  </AccordionItem>

                  <AccordionItem
                    title="3. Disclosure of data"
                    icon={
                      <Ionicons
                        name="share-social"
                        size={24}
                        color="#03e706ff"
                      />
                    }
                    isOpen={openId === "privacy"}
                    onPress={() => handleToggle("privacy")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      We do not sell or rent your personal data to third
                      parties. Your information may be shared only when
                      necessary to operate the app, such as with trusted service
                      providers who help with hosting, analytics, payments, or
                      customer support. We may also disclose information if
                      required to do so by law or to protect the rights, safety,
                      and security of our users, the app, or the public.
                    </Text>
                  </AccordionItem>

                  <AccordionItem
                    title="4. Security of data"
                    icon={
                      <Fontisto name="locked" size={24} color="#03e706ff" />
                    }
                    isOpen={openId === "security"}
                    onPress={() => handleToggle("security")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      We take reasonable and appropriate measures to protect
                      your data from unauthorized access, loss, misuse, or
                      disclosure. This includes the use of secure servers,
                      encryption where applicable, and access controls. While no
                      system is completely secure, we continuously review and
                      improve our security practices to safeguard your
                      information.
                    </Text>
                  </AccordionItem>

                  <AccordionItem
                    title="5. Your data rights"
                    icon={
                      <MaterialIcons name="gavel" size={24} color="#03e706ff" />
                    }
                    isOpen={openId === "rights"}
                    onPress={() => handleToggle("rights")}
                  >
                    <Text style={{marginRight:30}}>
                      You have the right to access, update, or correct your
                      personal information at any time through the app or by
                      contacting support. You may also request deletion of your
                      account and associated data, subject to legal or
                      operational requirements. Where applicable, you have the
                      right to object to or restrict certain types of data
                      processing.
                    </Text>
                  </AccordionItem>
                </View>
              </View>
            </View>
            <View style={styles.controlsec}>
              <Text style={styles.controltext}>Your Controls</Text>

              <TouchableOpacity style={styles.downloadButton}>
                <Feather name="download" size={24} color="black" />
                <Text style={styles.downloadText}>
                  Download Full Policy (PDF)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.downloadButton}>
                <FontAwesome name="folder-open" size={24} color="black" />
                <Text style={styles.downloadText}>Request my Data</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.effectivetext}>Effective Date: October 24, 2023</Text>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Policy;

const styles = StyleSheet.create({
  imagecon: {
    height: 250,
    width: "95%",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trusttext: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 130,
    gap: 20,
  },
  extext: {
    color: "grey",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 20,
    // textAlign:"center",
  },
  policysec: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  policytext: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  policylist: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  controlsec: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  controltext: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 10,
  },
  controlbtncon: {
    display: "flex",
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  downloadButton: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#c9feb9d4",
    marginBottom: 5,
  },
  downloadText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  effectivetext: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    marginTop: 35,
    marginBottom: 0,
    textAlign: "center",
  },
});
