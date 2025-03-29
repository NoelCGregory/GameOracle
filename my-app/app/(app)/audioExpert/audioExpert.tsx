import axios from "axios";

const API_TOKEN = "40c0ffd100038df28e5581956648cd75"; // API key
const AUDD_API_URL = 'https://api.audd.io/upload/';

export const identifyAudio = async (audioUri: string) => {
  if (!audioUri) {
    console.error("No audio file provided");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("api_token", API_TOKEN);
    formData.append("file", {
      uri: audioUri,
      type: "audio/mpeg", // adjust audio format
      name: "audio.mp3",
    } as any);

    const response = await axios.post(AUDD_API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // make sure request handled once
    if (response.data.status === "success") {
      const { title, artist, album, label } = response.data.result;
      console.log("Identified song:", { title, artist, album, label });
      return { title, artist, album, label };
    } else {
      console.error("Failed to identify song:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error identifying audio:", error);
    return null;
  }
};
