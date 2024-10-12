import { GenerateToken } from '@/services/spotify/generateToken';

/**
 * Fetches the top tracks for a given artist from the Spotify API.
 * @param artistId - The ID of the artist.
 * @returns A promise that resolves to an array of top tracks.
 */
export const fetchTopTracks = async (artistId: string) => {
  try {
    const access_token = await GenerateToken();
    
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top tracks');
    }

    const data = await response.json();
    return data.tracks;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
};