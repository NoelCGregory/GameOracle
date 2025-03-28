import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { Audio } from "expo-av";
import { Svg, Polyline } from "react-native-svg";

export default function AudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [levels, setLevels] = useState([]);
  const recordingRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Microphone access is required.");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();
      recordingRef.current = newRecording;

      const interval = setInterval(async () => {
        const status = await newRecording.getStatusAsync();
        if (status.isRecording) {
          setLevels((prev) => [...prev.slice(-50), status.metering]); // Keep last 30 points
        }
      }, 1000);

      recordingRef.current.interval = interval;

      setRecording(newRecording);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);

        Alert.alert("Recording Saved", `File saved at: ${uri}`);
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const playAudio = async () => {
    if (!audioUri) {
      Alert.alert("No Recording", "Record an audio first!");
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play audio", error);
    }
  };

  return (
    <View style={styles.container}>
      <Svg
        height="100"
        width="300"
        viewBox="0 0 300 100"
        style={{ backgroundColor: "#333", borderRadius: 10 }}
      >
        <Polyline
          points={levels.map((l, i) => `${i * 6},${50 - l * 2}`).join(" ")}
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </Svg>

      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play Audio" onPress={playAudio} disabled={!audioUri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
