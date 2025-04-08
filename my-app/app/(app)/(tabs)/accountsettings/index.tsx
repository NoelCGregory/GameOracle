import { useAuth } from "@/context/authContext";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "@/FirebaseConfig";
import { auth } from "@/FirebaseConfig";
import Toast from "react-native-toast-message";

export default function AccountSettings() {
  const router = useRouter();
  const { user } = useAuth();
  const [identificationsCount, setIdentificationsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const q = query(
            collection(db, "identificationHistories"),
            where("user", "==", user.uid) 
          );

          const querySnapshot = await getDocs(q);
          setIdentificationsCount(querySnapshot.size); 
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleDisplayName = async () => {
    if (!displayName.trim()) return;

    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
      });

      setIsEditing(false);
    } catch (error) {
      Toast.show({
        type: "error", // 'success' | 'error' | 'info'
        text1: "Error Updating",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view account settings</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Account Settings</Text>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Text style={styles.label}>Display Name</Text>
              {isEditing ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.input}
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholder="Enter display name"
                    autoFocus
                  />
                  <View style={styles.editButtons}>
                    <Pressable
                      onPress={() => setIsEditing(false)}
                      style={[styles.editButton, styles.cancelButton]}
                    >
                      <Text style={styles.editButtonText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      onPress={handleDisplayName}
                      style={[styles.editButton, styles.saveButton]}
                      disabled={updating}
                    >
                      {updating ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text
                          style={[styles.editButtonText, styles.saveButtonText]}
                        >
                          Save
                        </Text>
                      )}
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View style={styles.nameRow}>
                  <Text style={styles.value}>
                    {user.displayName || "Not set"}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setDisplayName(user.displayName || "");
                      setIsEditing(true);
                    }}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Identifications</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#6366f1" />
              ) : (
                <Text style={styles.value}>{identificationsCount}</Text>
              )}
            </View>
          </View>
        </View>

        <Toast />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 20,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editContainer: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#f8fafc",
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 12,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#f1f5f9",
  },
  saveButton: {
    backgroundColor: "#1E90FF",
    minWidth: 60,
    alignItems: "center",
  },
  editButtonText: {
    fontWeight: "500",
    fontSize: 14,
  },
  saveButtonText: {
    color: "white",
  },
});
