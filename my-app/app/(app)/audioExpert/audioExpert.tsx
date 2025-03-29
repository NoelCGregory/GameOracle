import * as FileSystem from 'expo-file-system';
import { View, StyleSheet, Button, Alert } from "react-native";
import axios from 'axios';

// Add your API token here (make sure it's set correctly).
const API_TOKEN = 'fd675d580127c0213cdbf67d0caaa0b7'; 

export const identifyAudio = async (uri: string) => {
  try {
    const fileUri = uri; // This is the URI we get from AudioRecorder
    const fileName = fileUri.split('/').pop(); // Extract file name from URI
    const fileType = fileUri.split('.').pop(); // Extract file type (extension)

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: `audio/${fileType}`,
    }as any);
    formData.append('api_token', API_TOKEN);

    // Make sure to send the file via POST in the expected format
    const response = await axios.post('https://api.audd.io/recognize/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === 'success' && response.data.result) {
      const { title, artist, album, label } = response.data.result;
      console.log("Song Identified:", { title, artist, album, label });
      return { title, artist, album, label };
    } else {
      console.warn("No song identified:", response.data);
      Alert.alert("No Song Identified", "Please try again with a different recording.");
      return null;
    }
  } catch (error) {
    console.error("Error identifying audio:", error);
    Alert.alert("Error", "Failed to process the audio. Please try again.");
    return null;
  }
};
