import abstract from "@/assets/images/abstract.png";
import ProfileHeader from "@/components/ProfileHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const boxWidth = width - 40;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ProfileHeader
        title="Our Story"
        onpress={() => {
          router.back();
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View>
          <View style={styles.imagecon}>
            <ImageBackground source={abstract} style={styles.image}>
              <Text style={styles.text}>Since 2025</Text>
              <Text style={styles.subtext}>
                Shopping
                {"\n"}
                Reimagined
              </Text>
            </ImageBackground>
          </View>
          <Text style={[styles.headtext, { color: theme.text }]}>
            Changing the way
            <Text style={styles.headtext2}> People Shop.</Text>
          </Text>
          <Text style={[styles.paratext, { color: theme.text }]}>
            We believe in empowering sustainable choices for everyone, making
            quality accessible and shopping seamless. Our journey began with a
            simple idea: that commerce should serve the community, not the other
            way around.
          </Text>
          <View style={styles.hollowcon}>
            <View style={styles.hollowbox}>
              <View style={styles.innerhollowbox}>
                <FontAwesome6 name="smile-wink" size={24} color="#01f205ff" />
                <Text style={styles.hollowtext}>Customers</Text>
              </View>
              <Text style={[styles.hollowtexthead, { color: theme.text }]}>
                10K+
              </Text>
            </View>
            <View style={styles.hollowbox}>
              <View style={styles.innerhollowbox}>
                <AntDesign name="product" size={24} color="#01f205ff" />
                <Text style={styles.hollowtext}>Products</Text>
              </View>
              <Text style={[styles.hollowtexthead, { color: theme.text }]}>
                50K+
              </Text>
            </View>
            <View style={styles.hollowbox}>
              <View style={styles.innerhollowbox}>
                <Entypo name="calendar" size={24} color="#01f205ff" />
                <Text style={styles.hollowtext}>Years</Text>
              </View>
              <Text style={[styles.hollowtexthead, { color: theme.text }]}>
                5+
              </Text>
            </View>
          </View>

          <View style={styles.missioncon}>
            <LinearGradient
              colors={["#d4f9e3ff", "#cefaddff"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.missionbox}
            >
              <Text style={styles.missiontext}>OUR MISSION</Text>
              <Text style={[styles.missionpara, { color: theme.text }]}>
                We bring Sustainable, High-Quality products directly to your
                door,<Text style={styles.missionpara2}>Hassle free </Text>
                and without compromising the planet.
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.valuetextcon}>
            <Text style={[styles.valuetext, { color: theme.text }]}>
              Our Core Values
            </Text>
            <MaterialCommunityIcons
              name="leaf-circle"
              size={35}
              marginRight={20}
              color="#01f205ff"
            />
          </View>
          <View style={styles.valuecon}>
            <View style={styles.valuebox}>
              <MaterialIcons name="recycling" size={32} color="#01f205ff" />
              <Text style={[styles.valueboxtext, { color: theme.text }]}>
                Sustainability
              </Text>
              <Text style={[styles.valueboxpara, { color: theme.text }]}>
                Committed to eco-friendly
                {"\n"}
                products and ethical shipping.
              </Text>
            </View>
            <View style={styles.valuebox}>
              <Ionicons
                name="shield-checkmark-sharp"
                size={32}
                color="#01f205ff"
              />
              <Text style={[styles.valueboxtext, { color: theme.text }]}>
                Integrity
              </Text>
              <Text style={[styles.valueboxpara, { color: theme.text }]}>
                Honesty Pricing and
                {"\n"}
                Transparent Sourcing.
              </Text>
            </View>
            <View style={[styles.valuebox, { marginTop: 15 }]}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={32}
                color="#01f205ff"
              />
              <Text style={[styles.valueboxtext, { color: theme.text }]}>
                Innovation
              </Text>
              <Text style={[styles.valueboxpara, { color: theme.text }]}>
                Always Finding better
                {"\n"}
                ways to serve.
              </Text>
            </View>
            <View style={[styles.valuebox, { marginTop: 15 }]}>
              <Ionicons name="people" size={32} color="#01f205ff" />
              <Text style={[styles.valueboxtext, { color: theme.text }]}>
                Community
              </Text>
              <Text style={[styles.valueboxpara, { color: theme.text }]}>
                Building Connections
                {"\n"}
                not just sales.
              </Text>
            </View>
          </View>
          <View style={styles.journeycon}>
            <Text style={[styles.journeytext, { color: theme.text }]}>
              Our Journey
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              contentContainerStyle={styles.scrollViewContent}
              decelerationRate="fast"
              snapToAlignment="center"
            >
              <View
                style={[
                  styles.journeybox,
                  { backgroundColor: theme.box, width: boxWidth },
                ]}
              >
                <Text style={styles.journeyyear}>2018</Text>
                <View style={styles.line} />
                <Text style={[styles.journeyboxtext, { color: theme.text }]}>
                  The Beginning
                </Text>
                <Text style={[styles.journeyboxpara, { color: theme.text }]}>
                  Founded with a vision to revolutionize the way people discover
                  and buy quality products online.
                </Text>
              </View>

              <View
                style={[
                  styles.journeybox,
                  { backgroundColor: theme.box, width: boxWidth },
                ]}
              >
                <Text style={styles.journeyyear}>2021</Text>
                <View style={styles.line} />
                <Text style={[styles.journeyboxtext, { color: theme.text }]}>
                  Expansion
                </Text>
                <Text style={[styles.journeyboxpara, { color: theme.text }]}>
                  Expanded our catalog to include sustainable goods and
                  partnered with ethical suppliers globally.
                </Text>
              </View>

              <View
                style={[
                  styles.journeybox,
                  { backgroundColor: theme.box, width: boxWidth },
                ]}
              >
                <Text style={styles.journeyyear}>2023</Text>
                <View style={styles.line} />
                <Text style={[styles.journeyboxtext, { color: theme.text }]}>
                  Global Reach
                </Text>
                <Text style={[styles.journeyboxpara, { color: theme.text }]}>
                  Optimized our logistics network to provide faster,
                  eco-friendly shipping to over 50 countries.
                </Text>
              </View>

              <View
                style={[
                  styles.journeybox,
                  { backgroundColor: theme.box, width: boxWidth },
                ]}
              >
                <Text style={styles.journeyyear}>2025</Text>
                <View style={styles.line} />
                <Text style={[styles.journeyboxtext, { color: theme.text }]}>
                  Innovation Era
                </Text>
                <Text style={[styles.journeyboxpara, { color: theme.text }]}>
                  Launching AI-driven personal shopping experiences to make
                  every purchase smarter and easier.
                </Text>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.readmorebtn}
            onPress={() => router.push("/(tabs)/home")}>
            <View style={styles.btninner}>
              <Text style={styles.btninnerText}>Shop The Collection</Text>
              <AntDesign name="arrow-right" size={22} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  imagecon: {
    height: 280,
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#01f205ff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 115,
    marginLeft: 30,
  },
  subtext: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 5,
    lineHeight: 50,
    marginLeft: 30,
  },
  headtext: {
    fontSize: 43,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 20,
  },
  headtext2: {
    fontWeight: "bold",
    fontSize: 43,
    color: "#03d606ff",
  },
  paratext: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginHorizontal: 20,
  },
  hollowcon: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 20,
    // backgroundColor: "#f4eeee27",
    borderRadius: 25,
    padding: 10,
  },
  hollowbox: {
    width: "31.33%",
    margin: 1,
    flexDirection: "column",
    backgroundColor: "theme.box",
    borderRadius: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fcf2f2ff",
  },
  innerhollowbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 5,
  },
  hollowtext: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
    color: "grey",
    // marginTop: -5,
  },
  hollowtexthead: {
    fontSize: 30,
    fontWeight: 600,
    textAlign: "center",
    marginLeft: -25,
    // marginTop: -5,
  },
  valuetextcon: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  valuetext: {
    marginLeft: 20,
    marginTop: 25,
    fontSize: 25,
    fontWeight: "bold",
    color: "theme.text",
  },
  journeytext: {
    marginLeft: 30,
    marginTop: 35,
    fontSize: 25,
    fontWeight: "bold",
    color: "theme.text",
  },
  valuecon: {
    width: "90%",
    marginTop: 15,
    alignSelf: "center",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valuebox: {
    width: "48%",
    margin: 1,
    flexDirection: "column",
    backgroundColor: "theme.box",
    borderRadius: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fcf2f2ff",
  },
  valueboxtext: {
    fontSize: 25,
    fontWeight: 600,
    color: "theme.text",
    marginTop: 5,
  },
  valueboxpara: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: 200,
    color: "theme.text",
  },
  journeycon: {
    flex: 1,
    paddingVertical: 10,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  journeybox: {
    marginHorizontal: 20,
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: "center",
  },
  journeyyear: {
    color: "#01f205ff",
    fontSize: 28,
    fontWeight: "bold",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#01f205ff",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  journeyboxtext: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  journeyboxpara: {
    fontSize: 16,
    lineHeight: 24,
  },
  missioncon: {
    width: "90%",
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
    display: "flex",
  },
  missionbox: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#01f205ff",
  },
  missiontext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#01f205ff",
  },
  missionpara: {
    marginTop: 15,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 2,
  },
  missionpara2: {
    color: "#01f205ff",
  },
  readmorebtn: {
    marginTop: 25,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#a3f5a4ff",
    backgroundColor: "#01f205ff",
  },
  btninner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btninnerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
