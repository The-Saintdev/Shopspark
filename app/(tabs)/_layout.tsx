import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import CustomTabBar from "@/components/CustomTabBar";

export default function TabLayout() {
  //   const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
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
