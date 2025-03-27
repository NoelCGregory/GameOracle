import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { AuthContextProvider } from "../context/authContext"; // Import your AuthProvider

import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../context/authContext";
import SplashScreen from "../components/splashScreen"; // Splash screen component

function RootInner() {
  const { user, loading } = useAuth();

  if (!loading) {
    return <Redirect href={user ? "/(app)" : "/login"} />;
  }
}

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContextProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="login"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="registration"
            options={{ headerShown: false, animation: "none" }}
          />
        </Stack>
        <RootInner />
      </AuthContextProvider>
    </SafeAreaView>
  );
}
