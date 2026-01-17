import { ScrollView, StyleSheet, Text, View, ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileHeader from '@/components/ProfileHeader'
import { useRouter } from 'expo-router'
import call from '@/assets/images/call image.png'
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";


const Call = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileHeader
        title="Help Center"
        onpress={() => {
          router.back();
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.imagecon}>
          <ImageBackground source={call} style={styles.image} />
        </View>

        <View style={styles.agentscon}>
          <View style={styles.statusWrapper}>
            <View style={styles.glow} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.agenttext}>Agents Online</Text>
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: "bold",
            color: "black",
            marginTop: 20,
          }}
        >
          We're here to help!
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "grey",
            marginTop: 12,
            lineHeight: 25,
          }}
        >
          Speak directly with our support team {"\n"}
          regarding the recent order.
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: "grey",
            marginTop: 35,
          }}
        >
          Call Toll-Free
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 35,
            fontWeight: "bold",
            color: "black",
            marginTop: 12,
          }}
        >
          +234 (808) 391 8399
        </Text>

        <TouchableOpacity style={styles.callButton}>
          <Ionicons
            name="call"
            size={22}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.callText}>Call Support Now</Text>
        </TouchableOpacity>

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
            <TouchableOpacity>
              <View style={styles.copyiconbox}>
                <MaterialCommunityIcons name="clock" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.directtextbox}>
              <Text style={styles.directtext}>Operating Hours</Text>
              <Text style={styles.directtextsub}>Time Zone WAT</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                display: "flex",
                width: "100%",
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.linetext}>Mon-Fri</Text>
              <Text style={styles.linetextsub}>24 Hours</Text>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                display: "flex",
                width: "100%",
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.linetext}>Sat-Sun</Text>
              <Text style={styles.linetextsub}>9:00 AM - 6:00 PM</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.chatwith}
          onPress={() => router.push("/help/chat")} >
          <Entypo name="chat" size={20} color="black" />
          <Text style={styles.chattext}>Chat with us instead</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Call

const styles = StyleSheet.create({
  separator: {
    height: 1, // Defines the thickness of the line
    width: "100%", // Makes the line span the full width
    backgroundColor: "#bab6b6ff",
    marginBottom: 5, // Sets the color (a light gray is common)
    // You can add margin here for spacing if needed
    // marginVertical: 8,
  },
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
  agentscon: {
    display: "flex",
    flexDirection: "row",
    padding: 6,
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    gap: 10,
    // marginHorizontal: 20,
    marginTop: 20,
  },
  // onlinedot: {
  //   height: 12,
  //   width: 12,
  //   borderRadius: 10,
  //   backgroundColor: "#30e877",
  // },
  agenttext: {
    fontSize: 17,
    fontWeight: "bold",
    color: "grey",
  },
  statusWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  glow: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: "rgba(3, 250, 93, 1)", // green with opacity
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#57fe94ff", // solid green
  },
  callButton: {
    width: "90%",
    alignSelf: "center",
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
  callText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  chatwith: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  chattext: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  directbox: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    // flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor: "#ffffffb6",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 40,
  },
  directtextbox: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 140,
  },
  directtext: {
    fontSize: 16,
    marginRight: 35,
    fontWeight: "bold",
    color: "black",
  },
  directtextsub: {
    fontSize: 14,
    marginRight: 45,
    marginTop: 5,
    fontWeight: "bold",
    color: "grey",
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
  linetext: {
    fontSize: 15,
    marginRight: 55,
    fontWeight: "300",
    color: "black",
  },
  linetextsub: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold",
    color: "black",
  },
});