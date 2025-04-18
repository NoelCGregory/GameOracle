import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";

// Initialize the Gemini API with your API key
// You should store this in an environment variable in a production app
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("Gemini API key not found in environment variables");
}
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Converts an image URI to a base64 string
 * @param uri The URI of the image
 * @returns A base64 string representation of the image
 */
const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    // If we already have a base64 string, extract just the base64 part
    if (uri.includes("base64,")) {
      const base64Data = uri.split("base64,")[1];
      if (!base64Data) {
        throw new Error("Invalid base64 data URL format");
      }
      return base64Data;
    }

    // For Android, the URI will be a file:// URI from the camera
    if (uri.startsWith("file://")) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    }

    throw new Error("Unsupported URI format");
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
};

// IdentificationRecord class implementing Identification
export default class GemniHandler implements APIHandler {
  request = async (imageUri: string): Promise<string> => {
    try {
      // Convert the image to base64 (required by Gemini API)
      const base64Image = await getBase64FromUri(imageUri);

      // For Android camera captures, we'll always use JPEG
      const mimeType = "image/jpeg";

      console.log("Processing image with Gemini API...");

      // Initialize the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Prepare the image data
      const imageData = {
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
      };

      // Create a prompt for game identification
      const prompt =
        "This is a screenshot from a video game. Please identify the game name in the screenshot. If you're not certain, provide your best guess and only return just the name of game nothing else.";

      // Generate content with the image
      const result = await model.generateContent([prompt, imageData]);
      const response = await result.response;
      let text = response.text();
      if (text.length > 50) {
        text = "";
      }

      return text;
    } catch (error) {
      console.error("Error processing image with Gemini:", error);
      throw new Error("Failed to analyze image with AI");
    }
  };

  requestGameDetails = async (gameName: string): Promise<string> => {
    try {
      // Convert the image to base64 (required by Gemini API)

      // For Android camera captures, we'll always use JPEG

      // Initialize the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `The game name is ${gameName} give me back description of the game,developer,release date and genre. Return this data as a json format.`;

      // Generate content with the image
      const result = await model.generateContent([prompt]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      // Remove any code block markers (e.g. "```typescript" and "```")
      const cleanedText = text.replace(/```[a-zA-Z]*\n|\n```/g, "");

      // Parse the cleaned text to a JSON object
      const parsed = JSON.parse(cleanedText);

      return parsed;
    } catch (error) {
      console.error("Error processing image with Gemini:", error);
      throw new Error("Failed to analyze image with AI");
    }
  };
}
