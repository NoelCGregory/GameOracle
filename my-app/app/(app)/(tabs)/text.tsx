import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import games from "../audioExpert/gameData"; // Ensure you have the games list in a separate file like games.js or games.ts

function findMatchingGame(userInput: string): string {
    const inputWords = userInput.toLowerCase().split(/\s+/);
    let bestMatch: string | null = null;
    let highestMatchCount = 0;
    
    for (const [game, data] of Object.entries(games)) {
        const keywords = new Set(data.keywords.map(k => k.toLowerCase()));
        let matchCount = inputWords.filter(word => keywords.has(word)).length;
        
        if (matchCount > highestMatchCount) {
            highestMatchCount = matchCount;
            bestMatch = game;
        }
    }
    
    return bestMatch || "No matching game found";
}

export default function GameMatcher() {
    const [input, setInput] = useState("");
    
    const handleMatch = () => {
        const match = findMatchingGame(input);
        console.log("Match Found:", match);
    };
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Game Matcher</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Describe a game..."
                    onChangeText={setInput}
                    value={input}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleMatch}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        height: 100,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 20,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
