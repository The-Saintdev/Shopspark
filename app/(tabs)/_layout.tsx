import { backgroundColors, primaryColors } from "@/constants/GlobalConstants";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  //   const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColors,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: backgroundColors,
          height: 60,
          borderTopWidth: 1,
          borderColor: "#ccc",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-city-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
