import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native";
import { AuthContextProvider } from "../context/authContext"; // Import your AuthProvider

import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../context/authContext";
import SplashScreen from "."; // Splash screen component

function RootInner() {
  const { user, loading } = useAuth();

  if (!loading) {
    setTimeout(() => {
      router.dismissAll();
      router.replace(user ? "/(app)" : "/login");
    }, 2000);
  }
}

export default function Layout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen
          name="(app)"
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
  );
}
