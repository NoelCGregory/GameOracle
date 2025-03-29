import { useAuth } from "@/context/authContext";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Button } from "react-native";

export default function IdentificationHistory() {
    return (
        <View>
            <Button title="Back" onPress={() => router.dismiss()}/>
            <Text>ID 1</Text>
            <Text>ID 2</Text>
        </View>
    )
}