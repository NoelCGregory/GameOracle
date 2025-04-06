import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router/build/hooks";
import GemniHandler from "@/app/services/API/GemniHandler";

export default function GameDetail() {
  const router = useRouter();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { gameName } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    let isMounted = true;

    const fetchGameData = async () => {
      try {
        const gemniHandler = new GemniHandler();
        const data = await gemniHandler.requestGameDetails(gameName);

        if (isMounted) {
          setGameData(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching game data:", error);
          setLoading(false);
        }
      }
    };

    fetchGameData();

    return () => {
      isMounted = false;
    };
  }, [gameName]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gameNameContainer}>
          <Text style={styles.gameName}>{gameData["game_name"]}</Text>
        </View>

        {gameData && (
          <View style={styles.gameInfoContainer}>
            <Text style={styles.gameInfoTitle}>Game Description</Text>
            <Text style={styles.gameInfoText}>{gameData["description"]}</Text>

            <Text style={styles.gameInfoTitle}>Developer:</Text>
            <Text style={styles.gameInfoText}>{gameData["developer"]}</Text>

            <Text style={styles.gameInfoTitle}>Release Date:</Text>
            <Text style={styles.gameInfoText}>{gameData["release_date"]}</Text>

            <Text style={styles.gameInfoTitle}>Genre:</Text>
            <Text style={styles.gameInfoText}>
              {gameData["genre"] ? gameData["genre"].join(",") : ""}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.goBackButtonContainer}>
        <Button title="Go Back" onPress={goBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  gameNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  gameName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  gameInfoContainer: {
    marginTop: 20,
  },
  gameInfoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  gameInfoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    lineHeight: 22,
  },
  goBackButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
