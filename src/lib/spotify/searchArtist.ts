import { GenerateToken } from '@/lib/spotify/generateToken';

export const searchArtist = async (query: string) => {
  try {
    if(!query) return;
    
    const access_token = await GenerateToken();
    
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
    });

    const data = await response.json();

    return data.artists.items;
  } catch(e) {
    console.error(e);
  }
}