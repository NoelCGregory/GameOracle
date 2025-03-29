import { useAuth } from "@/context/authContext";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function AccountSettings() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.textBold}> Account Settings</Text>

            <Pressable 
                onPress={() => router.navigate("/accountsettings/idhistory")}>
                <Text style={styles.text}>View Identification History</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
      },
    textBold: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        alignSelf: "flex-start", // Ensures text stays at the top
    },
    text: {
        alignSelf: "flex-start",
    },
});