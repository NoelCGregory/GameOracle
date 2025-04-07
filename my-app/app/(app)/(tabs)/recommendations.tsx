import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { collection, getDocs, orderBy, query, where, limit } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
// Import your IGDB API function
import { getGameRecommendations } from "../../services/API/igdbApi";

interface Game {
  id: number;
  name: string;
  // add additional fields such as cover image URL if needed
  cover?: {
    url: string;
  };
}

const Recommendations: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Query Firebase for the most recent identification for the current user
        const q = query(
          collection(db, "identificationHistories"),
          where("user", "==", user?.uid),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No recent identification found.");
          return;
        }
        // Extract the game name from the latest identification record
        const latestRecord = querySnapshot.docs[0].data();
        const identifiedGameName = latestRecord.game; // assuming the field is named 'game'
        
        // Fetch recommendations using the most current game name
        const recommendations = await getGameRecommendations(identifiedGameName);
        setGames(recommendations);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recommendations.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Game Recommendations</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Ensure the cover URL is complete
          const coverUrl =
            item.cover?.url && item.cover.url.startsWith("//")
              ? "https:" + item.cover.url
              : item.cover?.url || null;
          return (
            <View style={styles.gameItem}>
              {coverUrl ? (
                <Image
                  source={{ uri: coverUrl }}
                  style={styles.coverImage}
                  resizeMode="cover"
                />
              ) : null}
              <Text style={styles.gameName}>{item.name}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 15, textAlign: "center" },
  gameItem: { 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  gameName: { fontSize: 18, marginTop: 8, textAlign: "center" },
  coverImage: { width: 100, height: 150, borderRadius: 8 },
});

export default Recommendations;