import React from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />

      {/* Loading Indicator */}
      <ActivityIndicator size="large" color="#ffffff" />

      {/* Splash Text */}
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF", // Change to match your branding
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  text: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
