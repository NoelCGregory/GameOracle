import { useAuth } from "@/context/authContext";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { useRouter } from "expo-router";

type Identification = {
  game: string;
  timestamp: Timestamp;
  user: string;
};

export default function Tab() {
  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [history, setHistory] = useState<Identification[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "identificationHistories"),
        where("user", "==", user?.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);

      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Convert Firestore timestamp to Date object
        const timestamp = data.timestamp?.toDate(); // Convert Firestore Timestamp to JS Date

        // Format the date
        const formattedDate = timestamp
          ? timestamp.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "No date";

        return {
          id: doc.id,
          ...data,
          // Override the timestamp with formatted string
          timestamp: formattedDate,
          // Or keep both if you need the original timestamp elsewhere
          // formattedDate: formattedDate
        };
      });

      setHistory(list);
      setLoading(false);
    };

    fetchData();
  });

  const handleGame = (gameName: string) => {
    router.push({
      pathname: "/screens/gameDetail",
      params: {
        gameName: gameName,
      },
    });
  };

  return (
    <LinearGradient colors={["#1E90FF", "#87CEFA"]} style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.username}>{user?.displayName || "Gamer"}</Text>
        </View>
        <View style={styles.avatarPlaceholder}>
          <MaterialIcons name="account-circle" size={40} color="white" />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Recent Identifications</Text>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {history.map((item, id) => (
            <Pressable
              key={id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardContent}>
                <Text style={styles.gameName}>{item.game}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleGame(item.game)}
                >
                  <Text style={styles.buttonText}>More Details</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.timestamp}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#888" />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    width: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  cardContent: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  developer: {
    fontSize: 14,
    color: "#666",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginRight: 4,
  },
});
