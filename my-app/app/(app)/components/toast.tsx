// components/CustomToast.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const CustomToast = ({ text1, text2 }: BaseToastProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1e1e2f",
    borderRadius: 10,
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50", // Green stripe
    marginHorizontal: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "#ccc",
    marginTop: 4,
    fontSize: 14,
  },
});
