import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import games from './gameData'; // Import the game data
import React from 'react';
import { View, Text } from 'react-native';

const API_TOKEN = 'fd675d580127c0213cdbf67d0caaa0b7';

// Define the type for the games object
type GameDatabase = {
  [key: string]: {
    keywords: string[];
  };
};

// Define API response type
interface AuddResponse {
  status: string;
  result?: {
    title: string;
    artist: string;
    album: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Return type for identifyAudio
interface AudioIdentificationResult {
  title: string;
  artist: string;
  album: string;
  matchingGame: string | null;
}

// Ensure games has the correct type
const gameData: GameDatabase = games;

// Function to find the matching game based on song metadata
const findMatchingGame = (songTitle: string, artist: string, album: string) => {
  let bestMatch: string | null = null;
  let highestMatchCount = 0;

  for (const game of Object.keys(gameData)) { // Use Object.keys to get valid keys
    let matchCount = 0;
    const keywords = gameData[game].keywords; // validate

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

    // Track best match
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatch = game;
    }
  }

  return bestMatch;
};

// audio identification function
export const identifyAudio = async (uri: string): Promise<AudioIdentificationResult | null> => {
  try {
    const fileUri = uri;
    const fileName = fileUri.split('/').pop() || 'audio.m4a';
    const fileType = fileUri.split('.').pop() || 'm4a';

    console.log(`Preparing to identify: ${fileName} (${fileType})`);

    // request message for AudD
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: `audio/${fileType}`,
    } as any);
    formData.append('api_token', API_TOKEN);

    console.log("Sending request to AudD API...");

    //response message from AudD
    const response = await axios.post<AuddResponse>('https://api.audd.io/recognize/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Received response from AudD API");

    if (response.data.status === 'success' && response.data.result) { // song identified
      const { title, artist, album } = response.data.result;
      console.log("Song Identified:", { title, artist, album });

      // find matching game
      const matchingGame = findMatchingGame(title, artist, album);
      
      if (matchingGame) {
        console.log(`This song is from: ${matchingGame}`); // found song and matching game
        return { title, artist, album, matchingGame };
      } else {
        console.log("No matching game found.");
        return { title, artist, album, matchingGame: null }; // found song but no matching game
      }
    } else {
      console.warn("No song identified:", response.data); // did not find song or game
      return null;
    }
  } catch (error) {
    console.error("Error identifying audio:", error); // error fetching song
    return null;
  }
};
