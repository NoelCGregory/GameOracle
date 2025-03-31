import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Button } from "react-native";

export default function IdentificationSuccess() {
    return (
        <View>
            <Text style={styles.text}>YOUR GAME:</Text>
            <Text style={styles.textBold}>placeholder</Text> 
            <Button title="Rate Identification" onPress={() => router.navigate("/idsuccess/rateid")}/>
            <Button title="Home" onPress={() => router.navigate("/(app)/(tabs)")}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignSelf: "flex-start", // Ensures text stays at the top
  },
  textBold: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start", // Ensures text stays at the top
  },
});