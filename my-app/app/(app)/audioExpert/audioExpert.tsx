import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import games from './gameData'; // Import the game data
import React from 'react';
import { View, Text } from 'react-native';

// Add your API token here
const API_TOKEN = 'fd675d580127c0213cdbf67d0caaa0b7';

// Define the type for the games object
type GameDatabase = {
  [key: string]: {
    keywords: string[];
  };
};

// Ensure games has the correct type
const gameData: GameDatabase = games;

// Function to find the matching game based on song metadata
const findMatchingGame = (songTitle: string, artist: string, album: string) => {
  let bestMatch: string | null = null;
  let highestMatchCount = 0;

  for (const game of Object.keys(gameData)) { // Use Object.keys to get valid keys
    let matchCount = 0;
    const keywords = gameData[game].keywords; // Now TypeScript recognizes this as valid

    // Count matches with title, artist, and album
    keywords.forEach(keyword => {
      if (
        songTitle.toLowerCase().includes(keyword) || 
        artist.toLowerCase().includes(keyword) || 
        album.toLowerCase().includes(keyword)
      ) {
        matchCount++;
      }
    });

    // Track the best match
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatch = game;
    }
  }

  return bestMatch;
};

// Audio identification function
export const identifyAudio = async (uri: string) => {
  try {
    const fileUri = uri;
    const fileName = fileUri.split('/').pop();
    const fileType = fileUri.split('.').pop();

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: `audio/${fileType}`,
    } as any);
    formData.append('api_token', API_TOKEN);

    const response = await axios.post('https://api.audd.io/recognize/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === 'success' && response.data.result) {
      const { title, artist, album } = response.data.result;
      console.log("Song Identified:", { title, artist, album });

      // Find the matching game
      const matchingGame = findMatchingGame(title, artist, album);
      
      if (matchingGame) {
        console.log(`This song is from: ${matchingGame}`);
        return { title, artist, album, matchingGame };
      } else {
        console.log("No matching game found.");
        return { title, artist, album, matchingGame: null };
      }
    } else {
      console.warn("No song identified:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error identifying audio:", error);
    return null;
  }
};
