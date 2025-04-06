import games from "../experts/gameData"; // Ensure you have the games list in a separate file like games.js or games.ts

// IdentificationRecord class implementing Identification
export default class TextExpert implements IdentificationExpert {
  async getResult(userInput: string): Promise<string> {
    console.log("text analsuys");
    const inputWords = userInput.toLowerCase().split(/\s+/);
    let bestMatch: string | null = null;
    let highestMatchCount = 0;

    for (const [game, data] of Object.entries(games)) {
      const keywords = new Set(data.keywords.map((k) => k.toLowerCase()));
      let matchCount = inputWords.filter((word) => keywords.has(word)).length;

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        bestMatch = game;
      }
    }

    return bestMatch || "";
  }
}
