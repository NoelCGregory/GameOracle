import { router } from "expo-router";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";

type Identification = {
    game: string;
    timestamp: Timestamp;
    user: string;
}

export default function IdentificationHistory() {
    
    const { user } = useAuth();
    
    const [isLoading, setLoading] = useState(true);
    const [history, setHistory] = useState<Identification[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const q = query(collection(db, "identificationHistories"), where("user", "==", user.uid), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);

            const list = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setHistory(list);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <ActivityIndicator/>;
    }
    
    return (
        <View>
            <Button title="Back" onPress={() => router.dismiss()}/>
            <FlatList 
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    console.log(item);

                    const formattedDate = item.timestamp
                        ? new Date(item.timestamp.seconds * 1000).toLocaleString()
                        : "No Date";

                    return (
                    <View>
                        <Text>Game: {item.game}</Text>
                        <Text>{formattedDate}</Text>
                    </View>
                );
            }}
            />
        </View>
    )
}