import { useAuth } from "@/context/authContext";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Stack } from "expo-router";

export default function StackLayout() {
    return(
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
                name="idhistory"
                options={{ headerShown: false, animation: "none" }}
            />
        </Stack>
    )
}