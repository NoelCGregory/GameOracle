import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#1E90FF" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gameIdentification"
        options={{
          headerTitle: "Game Identify",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="upload" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations" // This should match the file name (without extension)
        options={{
          headerTitle: "Game Recommendations",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accountsettings"
        options={{
          headerTitle: "Account Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
