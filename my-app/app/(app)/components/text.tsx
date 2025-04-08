import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function TextInputer({ onCapture }: any) {
  const [input, setInput] = useState("");

  const handleMatch = () => {
    console.log(input);
    onCapture(input);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe a Game:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        multiline
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={Keyboard.dismiss}
      />
      <TouchableOpacity style={styles.button} onPress={handleMatch}>
        <Text style={styles.buttonText}>Add Text Input</Text>
      </TouchableOpacity>
    </View>
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
