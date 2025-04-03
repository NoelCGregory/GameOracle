import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Button } from "react-native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/FirebaseConfig";

const submitRating = async (rating) => {
    // if user rated the identification (non-null), add the rating to the repository.
    if (rating != null) {
        const docRef = await addDoc(collection(db, "identificationRatings"), {
            rating: rating,
            timestamp: Timestamp.now(),
        });
        console.log("Document written with id: ", docRef.id);
    }
    router.navigate("/(app)/(tabs)"); // navigate back to home screen after rating completed.
}

export default function RateID() {
    const [rating, setRating] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    
    return (
        <View>
            <Text>How would you rate this identification?</Text>
            <View 
                style = {{
                flexDirection: "row",
                justifyContent: "center",}}
            >
                {Array(totalStars)
                    .fill()
                    .map((v, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={{padding: 10,}}
                            onPress={() => {setRating(i+1)}}
                        >
                            <Text style={rating > i ? styles.starFilled : styles.starUnfilled}>★</Text>
                        </TouchableOpacity>
                    )})
                }
            </View>
            <Button title="Submit Rating" onPress={() => submitRating(rating)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    starFilled: {
        fontSize: 20,
        color: "yellow",
    },
    starUnfilled: {
        fontSize: 20,
        color: "white",
    },
})