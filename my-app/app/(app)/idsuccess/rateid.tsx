import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Button } from "react-native";

export default function RateID() {
    return (
        <View>
            <Text>Placeholder</Text>
            <Button title="Home" onPress={() => router.navigate("/(app)/(tabs)")}/>
        </View>
    )
}