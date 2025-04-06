import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import GameIdentification from "./(app)/(tabs)/gameIdentification";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});
