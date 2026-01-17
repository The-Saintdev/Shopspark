import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmailSupport = () => {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyboardView, { backgroundColor: theme.background }]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ProfileHeader
          title="Email Support"
          onpress={() => {
            router.back();
          }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <View>
            <View style={styles.iconcon}>
              <FontAwesome6 name="headset" size={40} color="#21a353" />
            </View>
            <Text style={styles.headtext}>How can we Help?</Text>
            <Text style={styles.subheadtext}>
              We're here to help you with your order {"\n"} issues or any
              questions
            </Text>

            <View style={styles.directbox}>
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.directtextbox}>
                  <Text style={styles.directtext}>Direct Email</Text>
                  <Text style={styles.directtextsub}>
                    support@shopspark.com
                  </Text>
                </View>
                <TouchableOpacity>
                  <View style={styles.copyiconbox}>
                    <Ionicons name="copy" size={23} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.mailButton}>
                <Entypo name="mail-with-circle" size={28} color="green" />
                <Text style={styles.mailText}>Open Mail App</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                marginTop: 35,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  marginRight: 5,
                  padding: 1,
                  height: 1,
                  borderRadius: 15,
                  backgroundColor: "#b4b2b2c7",
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#b4b2b2ff",
                }}
              >
                OR SEND A MESSAGE
              </Text>
              <View
                style={{
                  width: 100,
                  marginLeft: 5,
                  padding: 1,
                  height: 1,
                  borderRadius: 15,
                  backgroundColor: "#b4b2b2c7",
                }}
              />
            </View>

            <View style={styles.formbox}>
              <View style={styles.form}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Order #1234 - issue with item"
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.form2}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={styles.inputarea}
                  placeholder="Describe your issue......."
                  placeholderTextColor="gray"
                  multiline={true}
                />
              </View>

              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendText}>Send Message</Text>
                <Ionicons
                  name="send"
                  size={22}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
              
            </View>
            <View style={styles.footbox}>
              <MaterialCommunityIcons
                name="clock"
                size={19}
                color="#797777ff"
              />
              <Text style={styles.foottext}>
                We ususally reply within 24Hrs
              </Text>
            </View>
            <Text style={styles.foottext2}>Mon-Fri 9am-6pm WAT</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EmailSupport;

const styles = StyleSheet.create({
  keyboardView: {
      flex: 1,
    },
  iconcon: {
    marginTop: 0,
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#cef5dd",
    alignItems: "center",
    justifyContent: "center",
  },
  headtext: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheadtext: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "gray",
  },
  directbox: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    // flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffffb6",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  directtextbox: {
    flexDirection: "column",
    alignItems: "center",
  },
  directtext: {
    marginRight: 45,
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
  },
  directtextsub: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 5,
    fontWeight: "bold",
  },
  copyiconbox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e6e38d",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  mailButton: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#e8fcf0",
    marginBottom: 5,
  },
  mailText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "800",
    color: "green",
  },
  formbox: {
    width: "95%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
  },
  form: {
    padding: 5,
  },
  form2: {
    padding: 5,
    marginTop: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    marginTop: 10,
    width: "100%",
    fontSize: 17,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#e2e1e1ad",
    borderRadius: 15,
    padding: 15,
    // paddingVertical: 15,
    backgroundColor: "#ffffffa8",
  },
  inputarea: {
    marginTop: 10,
    width: "100%",
    fontSize: 17,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#e2e1e1ad",
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
    backgroundColor: "#ffffffa8",
  },
  sendButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: "#31e877",
    shadowColor: "#21a353",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
  },
  footbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 10,
    marginBottom: 8,
  },
  foottext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#797777ff",
  },
  foottext2: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#9a9696e2",
    textAlign: "center",
  },
});
