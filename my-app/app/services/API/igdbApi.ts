// api/igdbApi.ts

// For a prototype, you might hard-code these values temporarily.
// In production, use environment variables to securely store your credentials.
const CLIENT_ID = 'x26iur9iefsz5ubegky1mfb2vvw73n';
const CLIENT_SECRET = 'l5iwgybdq340eorf3gx8w3bk0tj1f2';

// Request an access token from Twitch
export const getAccessToken = async (): Promise<string> => {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  );
  const data = await response.json();
  return data.access_token;
};

// Fetch game recommendations from IGDB
export const getGameRecommendations = async (gameName: string): Promise<any[]> => {
  const token = await getAccessToken();

  // This is a sample query, I have to modify it to suit the recommendation logic
  const query = `
    fields id, name, cover.url;
    search "${gameName}";
    where name != "${gameName}";
    limit 10;
  `;

  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain'
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from IGDB');
  }

  const games = await response.json();
  return games;
};
