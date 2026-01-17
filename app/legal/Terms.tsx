import { StyleSheet, Image,ScrollView, Text, View,Platform,UIManager,LayoutAnimation,TouchableWithoutFeedback,ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import privacyShield from "@/assets/images/privashield.jpg";
import AccordionItem from "@/components/AccordionItem";
import ProfileHeader from "@/components/ProfileHeader";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  Fontisto,
  Feather
} from "@expo/vector-icons";


if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Terms = () => {
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
            title="Terms of Service"
            onpress={() => {
              router.back();
            }}
          />
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.imagecon}>
              <ImageBackground source={privacyShield} style={styles.image}>
                <View style={styles.trusttext}>
                  <MaterialIcons name="gavel" size={24} color="white" />
                  <Text
                    style={{ fontSize: 28, fontWeight: "bold", color: "white" }}
                  >
                    Agreement Overview
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
                    Please read these terms carefully to understand your rights
                    {"\n"}
                    and obligations when using our platform.
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.usagesec}>
              <Text style={[styles.usagetext, { color: theme.text }]}>
                Usage Rules
              </Text>
              <View style={styles.usagelist}>
                <View style={{ flex: 1 }}>
                  <AccordionItem
                    title="User Responsibilities"
                    icon={
                      <FontAwesome name="user" size={24} color="#03e706ff" />
                    }
                    isOpen={openId === "responsibility"}
                    onPress={() => handleToggle("responsibility")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      You are responsible for maintaining the confidentiality of
                      your account credentials and for all activities that occur
                      under your account. You agree to use the app lawfully and
                      not to engage in any activity that could harm the app,
                      other users, or our services. Providing accurate and
                      up-to-date information is also your responsibility.
                    </Text>
                  </AccordionItem>

                  <AccordionItem
                    title="Intellectual Property"
                    icon={
                      <FontAwesome6
                        name="copyright"
                        size={24}
                        color="#03e706ff"
                      />
                    }
                    isOpen={openId === "property"}
                    onPress={() => handleToggle("property")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      All content, features, designs, logos, and software within
                      the app are owned by or licensed to us and are protected
                      by intellectual property laws. You may not copy, modify,
                      distribute, or reverse-engineer any part of the app
                      without prior written permission. Use of the app does not
                      grant you ownership of any intellectual property rights.
                    </Text>
                  </AccordionItem>

                  <AccordionItem
                    title="Purchases & Returns"
                    icon={
                      <FontAwesome6
                        name="bag-shopping"
                        size={24}
                        color="#03e706ff"
                      />
                    }
                    isOpen={openId === "purchases"}
                    onPress={() => handleToggle("purchases")}
                  >
                    <Text style={{ marginRight: 30 }}>
                      You are responsible for all purchases made through the app
                      and agree to pay for any goods or services purchased in
                      full and on time. You may return or exchange eligible
                      items in accordance with our return policy, subject to
                      certain conditions. We reserve the right to reject returns
                      or exchanges that do not meet our requirements. We are not
                      responsible for any costs or expenses associated with
                      returns or exchanges.
                    </Text>
                  </AccordionItem>
                </View>
              </View>
              <View style={styles.dissec}>
                <Text style={styles.distext}>Important Disclaimers</Text>
                <View
                  style={[styles.container, { backgroundColor: theme.card }]}
                >
                  <View style={styles.disbox}>
                    <FontAwesome
                      name="warning"
                      size={26}
                      color="grey"
                      marginLeft={10}
                      marginTop={10}
                    />
                    <View style={styles.distextbox}>
                      <Text style={styles.dishead}>Warranty Disclaimer</Text>
                      <Text style={styles.dissubhead}>
                        The service is provided on an "as is" and "as {"\n"}
                        available" basis without any express or {"\n"} implied
                        warranties.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.disbox}>
                    <Feather
                      name="shield-off"
                      size={26}
                      color="grey"
                      marginLeft={10}
                      marginTop={10}
                    />
                    <View style={styles.distextbox}>
                      <Text style={styles.dishead}>
                        Limitation of Liability
                      </Text>
                      <Text style={styles.dissubhead}>
                        To the fullest extent permitted by law, we {"\n"} shall
                        not be liable for any indirect, incidental,{"\n"} or
                        consequential damages arising from your {"\n"} use of
                        the service.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.docusec}>
                <Text style={styles.docutext}>Your Controls</Text>

                <TouchableOpacity style={styles.downloadButton}>
                  <FontAwesome5 name="file-download" size={26} color="black" />
                  <Text style={styles.downloadText}>
                    Download Full Terms (PDF)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.downloadButton}>
                  <MaterialIcons name="gavel" size={26} color="black" />
                  <Text style={styles.downloadText}>Contact Legal Dept</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.effectivetext}>Effective Date: October 24, 2023</Text>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default Terms

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
  usagesec: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  usagetext: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  usagelist: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  dissec: {
    marginTop: 20,
    // marginLeft: 5,
    // marginRight: 5,
  },
  distext: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    width: "100%",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  disbox: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  distextbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  dishead: {
    marginRight: 100,
    fontSize: 19,
    fontWeight: "bold",
  },
  dissubhead: {
    fontSize: 15,
    color: "grey",
    lineHeight: 20,
  },
  separator: {
    height: 1, // Defines the thickness of the line
    width: "100%", // Makes the line span the full width
    backgroundColor: "#bab6b6ff",
    marginBottom: 10,
    marginTop: 12, // Sets the color (a light gray is common)
    // You can add margin here for spacing if needed
    // marginVertical: 8,
  },
  docusec: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  docutext: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
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
    width: "100%",
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
  effectivetext:{
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    marginTop: 35,
    marginBottom: 0,
    textAlign: "center",
  },
});