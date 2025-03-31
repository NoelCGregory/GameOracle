import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Button } from "react-native";
import { RotateInDownLeft } from "react-native-reanimated";

export default function RateID() {
    const [rating, setRating] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    
    const submitRating = (rating) => {
        // TODO: connect to DAO to store rating results.

        if (rating != null) console.log(rating);
        router.navigate("/(app)/(tabs)");
    }

    return (
        <View>
            <Text>How would you rate this identification?</Text>
            <View style = {{
                flexDirection: "row",
                justifyContent: "center",
            }}>
                {Array(totalStars)
                    .fill()
                    .map((v, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={{
                                padding: 10,
                            }}
                            onPress={() => {
                                setRating(i+1)
                        }}>
                            <Text style={rating > i ? styles.starFilled : styles.starUnfilled}>★</Text>
                        </TouchableOpacity>
                    )
                })}
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